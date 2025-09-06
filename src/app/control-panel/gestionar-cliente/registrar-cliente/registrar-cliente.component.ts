import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  DestroyRef
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs/operators';
import { ClienteService, CreateClienteDto } from '../service/cliente.service';
import swal from 'sweetalert2';

type Ctl<T> = FormControl<T | null>;

interface ClienteForm {
  nombre: Ctl<string>;
  apellido: Ctl<string>;
  correo: Ctl<string>;
  doc: Ctl<string>;
  celular: Ctl<string>;
  direccion: Ctl<string>;
}

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrarClienteComponent implements OnInit {
  // DI
  private readonly fb = inject(FormBuilder);
  private readonly clienteService = inject(ClienteService);
  private readonly destroyRef = inject(DestroyRef);

  // UI state
  loading = false;
  errorMsg = '';
  submitted = false;

  // Patrones (PE)
  private readonly regexNombre = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ ]{2,30}$/;
  private readonly regexApellido = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ ]{2,40}$/;
  private readonly regexDni = /^[0-9]{8}$/;       // DNI exacto 8 dígitos
  private readonly regexCelular = /^9[0-9]{8}$/;      // Perú: 9 dígitos, inicia con 9

  form!: FormGroup<ClienteForm>;

  // -------- lifecycle ----------
  ngOnInit(): void {
    this.form = this.fb.group<ClienteForm>({
      nombre: this.fb.control<string>('', { validators: [Validators.required, Validators.pattern(this.regexNombre), Validators.maxLength(30)] }),
      apellido: this.fb.control<string>('', { validators: [Validators.required, Validators.pattern(this.regexApellido), Validators.maxLength(40)] }),
      correo: this.fb.control<string>('', { validators: [Validators.required, Validators.email, this.sinEspacios(), Validators.maxLength(80)], updateOn: 'blur' }),
      doc: this.fb.control<string>('', { validators: [Validators.required, Validators.pattern(this.regexDni)], updateOn: 'blur' }),
      celular: this.fb.control<string>('', { validators: [Validators.required, Validators.pattern(this.regexCelular)] }),
      direccion: this.fb.control<string>('', { validators: [Validators.maxLength(120)] }),
    });

    // Normaliza correo a minúsculas al perder foco
    this.form.controls.correo.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(v => {
        if (typeof v === 'string') {
          const normalized = v.trim().toLowerCase();
          if (normalized !== v) {
            this.form.controls.correo.setValue(normalized, { emitEvent: false });
          }
        }
      });
  }

  // -------- getters de conveniencia (mejora legibilidad del template) ----------
  get f() { return this.form.controls; }
  ctrl<K extends keyof ClienteForm>(key: K): AbstractControl | null { return this.form.get(key as string); }
  invalid(name: keyof ClienteForm, err: string): boolean {
    const c = this.ctrl(name);
    return !!c && (c.touched || this.submitted) && c.hasError(err);
  }

  // -------- validadores personalizados ----------
  /** Evita espacios en el correo (ej.: "a b@c.com") */
  private sinEspacios() {
    return (ctrl: AbstractControl<string | null>): ValidationErrors | null =>
      /\s/.test(ctrl.value ?? '') ? { spaces: true } : null;
  }

  // -------- acciones ----------
  submit(): void {
    if (this.loading) return; // evita doble submit durante la llamada

    this.submitted = true;
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      swal.fire({
        title: 'Formulario inválido',
        text: 'Revisa los campos marcados en rojo.',
        icon: 'warning',
        customClass: { confirmButton: 'btn btn-warning' },
        buttonsStyling: false
      });
      return;
    }

    // Sanitiza antes de enviar
    const v = this.form.getRawValue();
    const payload: CreateClienteDto = {
      nombre: (v.nombre ?? '').trim(),
      apellido: (v.apellido ?? '').trim(),
      correo: (v.correo ?? '').trim().toLowerCase(),
      doc: (v.doc ?? '').trim(),
      celular: (v.celular ?? '').trim(),
      direccion: (v.direccion ?? '').trim(),
      // agrega defaults aquí si tu backend lo requiere (estado, ECli_Nombre, etc.)
    };

    this.loading = true;
    this.errorMsg = '';

    this.clienteService.addCliente(payload)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          // 1) apaga bandera para que no se muestren errores
          this.submitted = false;

          // 2) resetea valores y estado de cada control
          this.form.reset();
          Object.values(this.form.controls).forEach(c => {
            c.setErrors(null);
            c.markAsPristine();
            c.markAsUntouched();
            c.updateValueAndValidity({ onlySelf: true, emitEvent: false });
          });
          this.form.updateValueAndValidity({ emitEvent: false });

          // 3) feedback
          swal.fire({
            title: 'Registro exitoso',
            text: 'El cliente ha sido registrado.',
            icon: 'success',
            customClass: { confirmButton: 'btn btn-success' },
            buttonsStyling: false
          });
          // // Opcional: navegar de vuelta
          // this.router.navigate(['/home/gestionar-cliente']);
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = 'Ocurrió un error, vuelve a intentarlo.';
          swal.fire({
            title: 'Error',
            text: this.errorMsg,
            icon: 'error',
            customClass: { confirmButton: 'btn btn-danger' },
            buttonsStyling: false
          });
        }
      });
  }
}
