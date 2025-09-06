import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, shareReplay, tap, throwError } from 'rxjs';
import { Cliente } from '../model/cliente.model';

// ====== Page<T> según Spring Data (simplificado) ======
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;    // tamaño de página
  number: number;  // índice de página (0-based)
}

// ====== DTOs (ajusta a tu modelo si hace falta) ======
export type CreateClienteDto = Omit<Cliente, 'ID'> & Partial<Pick<Cliente, 'ID'>>;
export type UpdateClienteDto = Partial<Cliente> & { ID: string };

// Para compat con código existente que esperaba array u objeto
type ClienteArrOrObj = Cliente[] | Cliente;

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private readonly http = inject(HttpClient);

  // Rutas REST modernas (el interceptor añade /api/v1)
  private readonly endpoints = {
    list: `/clientes`,                      // GET
    byId: (id: string) => `/clientes/${id}`, // GET
    create: `/clientes`,                   // POST
    update: (id: string) => `/clientes/${id}`, // PUT
    delete: (id: string) => `/clientes/${id}`, // DELETE
  } as const;

  // ====== Cache (por combinación de parámetros) ======
  private clientesPageCache$?: Observable<Page<Cliente>>;
  private cacheKey?: string;

  /**
   * Lista paginada tal cual la devuelve Spring (Page<Cliente>).
   * Úsalo si manejas paginación en el componente.
   */
  listPage(opts?: { q?: string; page?: number; size?: number; sort?: string }): Observable<Page<Cliente>> {
    const _opts = {
      q: opts?.q ?? '',
      page: opts?.page ?? 0,
      size: opts?.size ?? 25,
      sort: opts?.sort ?? 'creadoEn,desc',
    };

    const key = JSON.stringify(_opts);
    if (this.clientesPageCache$ && this.cacheKey === key) return this.clientesPageCache$;

    let params = new HttpParams()
      .set('page', _opts.page)
      .set('size', _opts.size)
      .set('sort', _opts.sort);

    if (_opts.q) params = params.set('q', _opts.q);

    this.clientesPageCache$ = this.http
      .get<Page<Cliente>>(this.endpoints.list, { params })
      .pipe(shareReplay({ bufferSize: 1, refCount: false }));

    this.cacheKey = key;
    return this.clientesPageCache$;
  }

  /**
   * Conveniencia: sólo el arreglo (content) de la primera página.
   * Útil si todavía no manejas paginación en UI.
   */
  listSimple(opts?: { q?: string; size?: number; sort?: string }): Observable<Cliente[]> {
    return this.listPage({ q: opts?.q, page: 0, size: opts?.size ?? 100, sort: opts?.sort })
      .pipe(map(p => p.content));
  }

  // ==== Compat con tu firma previa getAllClientes(...) (devuelve array) ====
  getAllClientes(opts?: { forceRefresh?: boolean; q?: string }): Observable<Cliente[]> {
    // si piden refresco, invalida cache
    if (opts?.forceRefresh) this.invalidateCache();
    return this.listSimple({ q: opts?.q });
  }

  /** Crear (REST) y romper cache */
  addCliente(data: CreateClienteDto): Observable<Cliente> {
    return this.http.post<Cliente>(this.endpoints.create, data)
      .pipe(tap(() => this.invalidateCache()));
  }

  /**
   * Update (REST) por ID en la URL y body con campos a actualizar.
   * Nota: antes tu legacy metía el ID en el body; ahora es URL.
   */
  updateCliente(id: string, data: UpdateClienteDto): Observable<Cliente> {
    return this.http.put<Cliente>(this.endpoints.update(id), data)
      .pipe(tap(() => this.invalidateCache()));
  }

  /** Eliminar por ID (nuevo en REST) */
  deleteCliente(id: string): Observable<void> {
    return this.http.delete<void>(this.endpoints.delete(id))
      .pipe(tap(() => this.invalidateCache()));
  }

  /** Obtener por ID (objeto directo) */
  getByIdCliente(id: string): Observable<Cliente | null> {
    return this.http.get<Cliente>(this.endpoints.byId(id))
      .pipe(map(res => res ?? null));
  }

  /** Variante estricta: lanza error si no existe */
  getByIdClienteStrict(id: string): Observable<Cliente> {
    return this.getByIdCliente(id).pipe(
      map((c) => c ?? throwError(() => new Error(`Cliente ${id} no encontrado`)) as never)
    );
  }

  /** ===== Utilidades ===== */
  private invalidateCache(): void {
    this.clientesPageCache$ = undefined;
    this.cacheKey = undefined;
  }

  // ==== (Opcional) Compat para no romper llamadas antiguas ====
  /** Compat: si tu UI aún llama putClienteById(data), delega usando data.ID */
  putClienteById(data: UpdateClienteDto): Observable<Cliente> {
    if (!data?.ID) return throwError(() => new Error('Falta ID en UpdateClienteDto'));
    return this.updateCliente(String(data.ID), data);
  }
}
