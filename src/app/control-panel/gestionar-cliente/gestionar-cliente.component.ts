import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ChangeDetectionStrategy,
  inject,
  DestroyRef
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';

import { Cliente } from './model/cliente.model';
import { ClienteService, CreateClienteDto, UpdateClienteDto } from './service/cliente.service';

@Component({
  selector: 'app-gestionar-cliente',
  templateUrl: './gestionar-cliente.component.html',
  styleUrls: ['./gestionar-cliente.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GestionarClienteComponent implements OnInit, AfterViewInit {
  private readonly clienteService = inject(ClienteService);
  private readonly destroyRef = inject(DestroyRef);

  displayedColumns: ReadonlyArray<keyof Cliente | 'actions'> = [

    'nombre',
    'apellido',
    'correo',
    'celular',
    'doc',
    'direccion',
    'actions'
  ];

  loading = false;
  errorMsg = '';
  dataSource = new MatTableDataSource<Cliente>([]);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  // -----------------------------
  // Ciclo de vida
  // -----------------------------
  ngOnInit(): void {
    this.configureFiltering();
    this.loadClientes(); // primera carga (usa cache del service)
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // -----------------------------
  // Carga de datos
  // -----------------------------
  /** Carga la lista; si `refresh` es true, fuerza reconsulta al backend. */
  loadClientes(refresh = false): void {
    this.loading = true;
    this.errorMsg = '';

    this.clienteService
      .getAllClientes({ forceRefresh: refresh })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(err => {
          console.error(err);
          this.errorMsg = 'No se pudieron cargar los clientes.';
          return of<Cliente[]>([]);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe(raw => {
        // Mapea por si tu backend devuelve `id` y `numDoc`
        const clientes = (raw ?? []).map((x: any) => ({
          ...x,
          ID: x.ID ?? x.id ?? x.Id ?? '',
          doc: x.doc ?? x.numDoc ?? x.NumDoc ?? ''
        })) as Cliente[];

        this.dataSource.data = clientes;

        // reconecta después de asignar data
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // fuerza “mostrar todo” al inicio
        this.applyFilter('');
      });
  }

  // -----------------------------
  // Filtro
  // -----------------------------
  applyFilter(value: string): void {
    this.dataSource.filter = (value ?? '').trim().toLowerCase();
  }



  private configureFiltering(): void {
    this.dataSource.filterPredicate = (row: Cliente, filter: string) => {
      const haystack = [
        row.ID,
        row.nombre,
        row.apellido,
        row.correo,
        row.celular,
        row.doc,
        row.direccion,
        row.estado,
        row.ECli_Nombre
      ]
        .map(v => String(v ?? '').toLowerCase())
        .join(' | ');
      return haystack.includes(filter);
    };
  }

  // -----------------------------
  // Acciones (ejemplos)
  // -----------------------------
  /** Ejemplo: obtener un cliente por ID (suave, devuelve null si no existe). */
  getByIdCliente(id: string): void {
    this.loading = true;
    this.errorMsg = '';

    this.clienteService
      .getByIdCliente(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(err => {
          console.error(err);
          this.errorMsg = 'No se pudo obtener el cliente.';
          return of(null);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe(cliente => {
        if (!cliente) return;
        // Aquí podrías abrir un dialog o setear un formulario de edición
        // this.openEditDialog(cliente);
        console.log('Cliente', cliente);
      });
  }

  /** Ejemplo: crear cliente y refrescar lista. */
  onAddCliente(payload: CreateClienteDto): void {
    this.loading = true;
    this.errorMsg = '';

    this.clienteService
      .addCliente(payload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(err => {
          console.error(err);
          this.errorMsg = 'No se pudo registrar el cliente.';
          return of(null);
        }),
        switchMap(res => {
          if (!res) return of(null);
          // Fuerza recarga de la lista para reflejar el alta
          return this.clienteService.getAllClientes({ forceRefresh: true });
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe(clientes => {
        console.log('clientes len', Array.isArray(clientes) ? clientes.length : 'no array');
        console.table(clientes?.slice?.(0, 5) ?? []);
        this.dataSource.data = clientes ?? [];

        // asegúrate de reconectar después de asignar data
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // fuerza un “re-evaluado” del filtro para mostrar todo
        this.applyFilter('');
      });
  }

  /** Ejemplo: actualizar cliente y refrescar lista. */
  onUpdateCliente(payload: UpdateClienteDto): void {
    this.loading = true;
    this.errorMsg = '';

    this.clienteService
      .putClienteById(payload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(err => {
          console.error(err);
          this.errorMsg = 'No se pudo actualizar el cliente.';
          return of(null);
        }),
        switchMap(res => {
          if (!res) return of(null);
          // Fuerza recarga de la lista para reflejar la edición
          return this.clienteService.getAllClientes({ forceRefresh: true });
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe(clientes => {
        if (clientes) this.dataSource.data = clientes;
      });
  }
}
