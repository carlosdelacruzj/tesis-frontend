import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, shareReplay, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Cliente } from '../model/cliente.model';

// DTOs: lo mínimo necesario para crear/actualizar
export type CreateClienteDto = Omit<Cliente, 'ID'> & Partial<Pick<Cliente, 'ID'>>;
export type UpdateClienteDto = Partial<Cliente> & { ID: string };

// Si tu API a veces devuelve array y a veces objeto:
type ClienteArrOrObj = Cliente[] | Cliente;

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private readonly http = inject(HttpClient);
  private readonly API = environment.baseUrl;

  private readonly endpoints = {
    list: `${this.API}/cliente/consulta/getAllCliente`,
    byId: (id: string) => `${this.API}/cliente/consulta/getByIdCliente/${id}`,
    create: `${this.API}/cliente/registro/postCliente`,
    update: `${this.API}/cliente/actualiza/putClienteById`,
  } as const;

  // Cache de lista (invalida en create/update)
  private clientesCache$?: Observable<Cliente[]>;

  /** Lista con cache; usa `forceRefresh: true` si quieres reconsultar. */
  getAllClientes(opts?: { forceRefresh?: boolean; q?: string }): Observable<Cliente[]> {
    if (!opts?.forceRefresh && this.clientesCache$) return this.clientesCache$;

    let params = new HttpParams();
    if (opts?.q) params = params.set('q', opts.q); // sólo si tu backend acepta filtro

    this.clientesCache$ = this.http
      .get<Cliente[]>(this.endpoints.list, { params })
      .pipe(shareReplay({ bufferSize: 1, refCount: false }));

    return this.clientesCache$;
  }

  /** Crea y **rompe cache** de la lista. */
  addCliente(data: CreateClienteDto): Observable<Cliente> {
    return this.http.post<Cliente>(this.endpoints.create, data).pipe(
      tap(() => this.invalidateCache())
    );
  }

  /** Update y **rompe cache** de la lista. */
  putClienteById(data: UpdateClienteDto): Observable<Cliente> {
    return this.http.put<Cliente>(this.endpoints.update, data).pipe(
      tap(() => this.invalidateCache())
    );
  }

  /** Devuelve `Cliente | null` si no existe. */
  getByIdCliente(id: string): Observable<Cliente | null> {
    return this.http.get<ClienteArrOrObj>(this.endpoints.byId(id)).pipe(
      map((res) => Array.isArray(res) ? (res[0] ?? null) : (res ?? null))
    );
  }

  /** Variante estricta: emite error si no existe. */
  getByIdClienteStrict(id: string): Observable<Cliente> {
    return this.getByIdCliente(id).pipe(
      map((c) => c ?? throwError(() => new Error(`Cliente ${id} no encontrado`)) as never)
    );
  }

  private invalidateCache(): void {
    this.clientesCache$ = undefined;
  }
}
