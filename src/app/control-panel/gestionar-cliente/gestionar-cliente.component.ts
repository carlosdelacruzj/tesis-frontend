import {
  Component, OnInit, AfterViewInit, ViewChild, ChangeDetectionStrategy,
  inject, DestroyRef, ChangeDetectorRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  catchError, debounceTime, distinctUntilChanged, finalize, map, of, tap
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private readonly cdr = inject(ChangeDetectorRef);

  displayedColumns: ReadonlyArray<keyof Cliente | 'actions'> = [
    'nombre', 'apellido', 'correo', 'celular', 'doc', 'direccion', 'actions'
  ];

  loading = false;
  errorMsg = '';
  filtroCtrl = new FormControl<string>('', { nonNullable: true });

  dataSource = new MatTableDataSource<Cliente>([]);

  // --- Setters: se llaman cada vez que Angular crea/destruye el paginator/sort (por el *ngIf) ---
  private _paginator?: MatPaginator;
  @ViewChild(MatPaginator)
  set paginator(p: MatPaginator | undefined) {
    this._paginator = p;
    if (p) {
      this.dataSource.paginator = p;
      // Asegura que el rango y botones se actualicen
      p.length = this.dataSource.data.length;
      p.pageIndex = 0;
    }
  }
  get paginator() { return this._paginator!; }

  private _sort?: MatSort;
  @ViewChild(MatSort)
  set sort(s: MatSort | undefined) {
    this._sort = s;
    if (s) this.dataSource.sort = s;
  }
  get sort() { return this._sort!; }
  // -----------------------------------------------------------------------------------------------

  ngOnInit(): void {
    console.time('[CLIENTES] init->firstLoad');
    this.configureFilteringAndSorting();
    this.wireFilterInput();
    this.loadClientes(); // primera carga
  }

  ngAfterViewInit(): void {
    // Si ya existen referencias, vuelve a cablear (por seguridad)
    if (this._paginator) this.dataSource.paginator = this._paginator;
    if (this._sort) this.dataSource.sort = this._sort;
  }

  private configureFilteringAndSorting(): void {
    const normalize = (v: unknown) =>
      String(v ?? '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');

    this.dataSource.filterPredicate = (row: Cliente, filter: string) => {
      const haystack = [
        (row as any).ID, row.nombre, row.apellido, row.correo,
        row.celular, (row as any).doc, row.direccion, (row as any).estado, (row as any).ECli_Nombre
      ].map(normalize).join(' | ');
      return haystack.includes(normalize(filter));
    };

    this.dataSource.sortingDataAccessor = (item: Cliente, property: string) => {
      const val = (item as any)[property];
      if (property === 'doc' || property === 'celular') {
        const num = Number(String(val ?? '').replace(/\D+/g, ''));
        return isNaN(num) ? -Infinity : num;
      }
      return normalize(val);
    };
  }

  private wireFilterInput(): void {
    this.filtroCtrl.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => this.applyFilter(value));
  }

  // ===== CARGA =====
  loadClientes(refresh = false): void {
    console.time('[CLIENTES] loadClientes');
    this.loading = true;
    this.errorMsg = '';
    this.cdr.markForCheck();

    this.clienteService
      .getAllClientes({ forceRefresh: refresh })
      .pipe(
        tap(() => console.log('[CLIENTES] request lanzado')),
        map(raw => {
          const arr = (raw ?? []) as any[];
          const out = arr.map(x => ({
            ...x,
            ID:  x.ID ?? x.id ?? x.Id ?? '',
            doc: x.doc ?? x.numDoc ?? x.NumDoc ?? ''
          })) as Cliente[];
          console.log(`[CLIENTES] mapeados: ${out.length} items`);
          return out;
        }),
        catchError(err => {
          console.error('[CLIENTES] error', err);
          this.errorMsg = 'No se pudieron cargar los clientes.';
          return of<Cliente[]>([]);
        }),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
          console.timeEnd('[CLIENTES] loadClientes');
          console.timeEnd('[CLIENTES] init->firstLoad');
        })
      )
      .subscribe(clientes => {
        // Reemplaza instancia + re-cablea (los setters harán el wiring si el paginator existe)
        this.dataSource = new MatTableDataSource<Cliente>(clientes);

        if (this._paginator) {
          this.dataSource.paginator = this._paginator;
          this._paginator.length = clientes.length; // ⚑ importante para que no diga "0 de 0"
          this._paginator.pageIndex = 0;
        }
        if (this._sort) {
          this.dataSource.sort = this._sort;
        }

        this.applyFilter(this.filtroCtrl.value ?? '');
        console.log('[CLIENTES] tabla actualizada');
        this.cdr.markForCheck();
      });
  }

  // ===== FILTRO =====
  applyFilter(value: string): void {
    this.dataSource.filter = (value ?? '').trim();
    if (this._paginator) this._paginator.firstPage();
  }

  // ===== CRUD =====
  onAddCliente(payload: CreateClienteDto): void {
    this.loading = true; this.errorMsg = ''; this.cdr.markForCheck();
    this.clienteService.addCliente(payload)
      .pipe(
        tap(() => console.log('[CLIENTES] addCliente OK')),
        catchError(err => {
          console.error('[CLIENTES] addCliente ERROR', err);
          this.errorMsg = 'No se pudo registrar el cliente.';
          return of(null);
        }),
        finalize(() => { this.loading = false; this.cdr.markForCheck(); })
      )
      .subscribe(res => { if (res) this.loadClientes(true); });
  }

  onUpdateCliente(payload: UpdateClienteDto): void {
    this.loading = true; this.errorMsg = ''; this.cdr.markForCheck();
    this.clienteService.putClienteById(payload)
      .pipe(
        tap(() => console.log('[CLIENTES] updateCliente OK')),
        catchError(err => {
          console.error('[CLIENTES] updateCliente ERROR', err);
          this.errorMsg = 'No se pudo actualizar el cliente.';
          return of(null);
        }),
        finalize(() => { this.loading = false; this.cdr.markForCheck(); })
      )
      .subscribe(res => { if (res) this.loadClientes(true); });
  }

  // TrackBy para el mat-table (se pasa en [trackBy] del template)
  trackByID = (_: number, row: Cliente) => row.ID;
}
