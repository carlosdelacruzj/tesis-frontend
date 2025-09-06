import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, switchMap, of } from 'rxjs';

import { Cliente } from '../model/cliente.model';
import { ClienteService, UpdateClienteDto } from '../service/cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditarClienteComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly clienteService = inject(ClienteService);

  loading = false;
  errorMsg = '';

  // Patrones coherentes con registrar
  private readonly nombrePattern = /^[a-záéíóúüñ ]{2,30}$/i;
  private readonly apellidoPattern = /^[a-záéíóúüñ ]{2,40}$/i;
  private readonly docPattern = /^[0-9]{8}$/;       // DNI Perú
  private readonly celularPattern = /^[0-9]{7,9}$/; // 7–9 dígitos

  form!: FormGroup<{
    ID: AbstractControl<string>;           // readonly visualmente
    nombre: AbstractControl<string>;
    apellido: AbstractControl<string>;
    correo: AbstractControl<string>;
    doc: AbstractControl<string>;
    celular: AbstractControl<string>;
    direccion: AbstractControl<string>;
  }>;

  ngOnInit(): void {
    this.buildForm();
    // 1) Intenta leer :id de params; 2) si no, de query params ?id=
    const idFromParam = this.route.snapshot.paramMap.get('id') ?? this.route.snapshot.queryParamMap.get('id');

    if (!idFromParam) {
      this.errorMsg = 'No se encontró el ID del cliente en la ruta.';
      // Opcional: redirige de vuelta a la lista
      // this.router.navigate(['/home/gestionar-cliente']);
      return;
    }

    this.loadCliente(idFromParam);
    this.setupTrimmer();
  }

  // -----------------------------
  // Form
  // -----------------------------
  private buildForm(): void {
    this.form = this.fb.nonNullable.group({
      ID: [{ value: '', disabled: true }, [Validators.required]],
      nombre: ['', [Validators.required, Validators.pattern(this.nombrePattern)]],
      apellido: ['', [Validators.required, Validators.pattern(this.apellidoPattern)]],
      correo: ['', [Validators.required, Validators.email, this.emailNoSpaces()]],
      doc: ['', [Validators.required, Validators.pattern(this.docPattern)]],
      celular: ['', [Validators.required, Validators.pattern(this.celularPattern)]],
      direccion: ['', [Validators.maxLength(120)]],
    }) as any;
  }

  private setupTrimmer(): void {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      ['nombre', 'apellido', 'correo', 'doc', 'celular', 'direccion'].forEach(key => {
        const c = this.form.get(key);
        const v = (c?.value ?? '') as string;
        if (typeof v === 'string') {
          const trimmed = v.replace(/\s+/g, ' ').trim();
          if (trimmed !== v) c?.setValue(trimmed, { emitEvent: false });
        }
      });
    });
  }

  private emailNoSpaces() {
    return (ctrl: AbstractControl<string>): ValidationErrors | null =>
      /\s/.test(ctrl.value ?? '') ? { spaces: true } : null;
  }

  // -----------------------------
  // Carga de datos
  // -----------------------------
  private loadCliente(id: string): void {
    this.loading = true;
    this.errorMsg = '';

    this.clienteService
      .getByIdCliente(id) // usa la versión suave; si prefieres estricta: getByIdClienteStrict(id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (cliente) => {
          if (!cliente) {
            this.errorMsg = `No se encontró el cliente con ID ${id}.`;
            return;
          }
          this.patchForm(cliente);
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = 'No se pudo cargar el cliente.';
        }
      });
  }

  private patchForm(c: Cliente): void {
    this.form.patchValue({
      ID: c.ID ?? '',
      nombre: c.nombre ?? '',
      apellido: c.apellido ?? '',
      correo: (c.correo ?? '').toLowerCase(),
      doc: c.doc ?? '',
      celular: c.celular ?? '',
      direccion: c.direccion ?? ''
    });
  }

  // -----------------------------
  // Guardar cambios
  // -----------------------------
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      swal.fire({
        text: 'Revisa los campos marcados.',
        icon: 'warning',
        customClass: { confirmButton: 'btn btn-warning' },
        buttonsStyling: false
      });
      return;
    }

    const ID = this.form.getRawValue().ID; // como el control está disabled
    const payload: UpdateClienteDto = {
      ID,
      nombre: this.form.value.nombre!,
      apellido: this.form.value.apellido!,
      correo: (this.form.value.correo ?? '').toLowerCase(),
      doc: this.form.value.doc!,
      celular: this.form.value.celular!,
      direccion: this.form.value.direccion ?? ''
    };

    this.loading = true;
    this.errorMsg = '';

    this.clienteService
      .putClienteById(payload)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          swal.fire({
            text: 'Actualización exitosa',
            icon: 'success',
            customClass: { confirmButton: 'btn btn-success' },
            buttonsStyling: false
          });
          // Opcional: volver a la lista al guardar
          // this.router.navigate(['/home/gestionar-cliente']);
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = 'Ocurrió un error al actualizar.';
          swal.fire({
            text: this.errorMsg,
            icon: 'error',
            customClass: { confirmButton: 'btn btn-danger' },
            buttonsStyling: false
          });
        }
      });
  }

  // -----------------------------
  // Utilitarios UI
  // -----------------------------
  get f() {
    return this.form.controls;
  }
}
