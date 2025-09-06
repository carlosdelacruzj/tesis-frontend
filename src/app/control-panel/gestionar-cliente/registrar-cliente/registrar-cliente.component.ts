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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ClienteService, CreateClienteDto } from '../service/cliente.service';
import { finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrarClienteComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly clienteService = inject(ClienteService);

  loading = false;
  errorMsg = '';

  // Patrones (ajústalos a tu realidad de negocio)
  private readonly nombrePattern = /^[a-záéíóúüñ ]{2,30}$/i;
  private readonly apellidoPattern = /^[a-záéíóúüñ ]{2,40}$/i;
  private readonly docPattern = /^[0-9]{8}$/;           // DNI Perú (8 dígitos)
  private readonly celularPattern = /^[0-9]{7,9}$/;     // genérico 7–9 dígitos

  form!: FormGroup<{
    nombre: AbstractControl<string>;
    apellido: AbstractControl<string>;
    correo: AbstractControl<string>;
    doc: AbstractControl<string>;
    celular: AbstractControl<string>;
    direccion: AbstractControl<string>;
  }>;

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      nombre: ['', [Validators.required, Validators.pattern(this.nombrePattern)]],
      apellido: ['', [Validators.required, Validators.pattern(this.apellidoPattern)]],
      correo: ['', [Validators.required, Validators.email, this.emailNoSpaces()]],
      doc: ['', [Validators.required, Validators.pattern(this.docPattern)]],
      celular: ['', [Validators.required, Validators.pattern(this.celularPattern)]],
      direccion: ['', [Validators.maxLength(120)]],
    }) as any;

    // Normalización básica: trim a medida que escribe
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

  // Validator sencillo para evitar espacios en el correo
  private emailNoSpaces() {
    return (ctrl: AbstractControl<string>): ValidationErrors | null =>
      /\s/.test(ctrl.value ?? '') ? { spaces: true } : null;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      swal.fire({
        text: 'Revisa los campos marcados en rojo.',
        icon: 'warning',
        customClass: { confirmButton: 'btn btn-warning' },
        buttonsStyling: false
      });
      return;
    }

    const payload: CreateClienteDto = {
      // Ajustado a tu modelo / service (usa `doc`, no `numDoc`)
      nombre: this.form.value.nombre!,
      apellido: this.form.value.apellido!,
      correo: (this.form.value.correo ?? '').toLowerCase(),
      doc: this.form.value.doc!,
      celular: this.form.value.celular!,
      direccion: this.form.value.direccion ?? '',
      // Si tu backend requiere otros campos por defecto (estado, ECli_Nombre, etc.) agrégalos aquí
    };

    this.loading = true;
    this.errorMsg = '';

    this.clienteService.addCliente(payload)
      .pipe(
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: () => {
          this.form.reset();
          swal.fire({
            text: 'Registro exitoso',
            icon: 'success',
            customClass: { confirmButton: 'btn btn-success' },
            buttonsStyling: false
          });
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = 'Ocurrió un error, vuelve a intentarlo.';
          swal.fire({
            text: this.errorMsg,
            icon: 'error',
            customClass: { confirmButton: 'btn btn-danger' },
            buttonsStyling: false
          });
        }
      });
  }
}
