import { Component, inject, signal, computed } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ¡Importar el Router!

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  private router = inject(Router);

  registerForm: FormGroup;

  login() {
    this.router.navigate(['/login']); // Redirigir al login
  }

  submitted = signal(false);
  passwordVisible = signal(false);
  confirmPasswordVisible = signal(false);

  // Signals para validación específica de contraseña
  hasUpperCase = signal(false);
  hasLowerCase = signal(false);
  hasNumbers = signal(false);
  hasSpecialChar = signal(false);
  hasMinLength = signal(false);

  constructor(private fb: FormBuilder) {
    // Usando el nuevo API typesafe sin el método group deprecado
    this.registerForm = this.fb.nonNullable.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        terms: [false, [Validators.requiredTrue]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );

    // Escuchar cambios en la contraseña para validación en tiempo real
    this.registerForm.get('password')?.valueChanges.subscribe((password) => {
      this.validatePasswordRequirements(password);
    });
  }

  // Validación específica de requisitos de contraseña
  validatePasswordRequirements(password: string) {
    this.hasUpperCase.set(/[A-Z]/.test(password || ''));
    this.hasLowerCase.set(/[a-z]/.test(password || ''));
    this.hasNumbers.set(/\d/.test(password || ''));
    this.hasSpecialChar.set(/[@$!%*?&]/.test(password || ''));
    this.hasMinLength.set((password?.length || 0) >= 8);
  }

  // Computed signals para errores
  firstNameError = computed(() => {
    const control = this.registerForm.get('firstName');
    if (!control?.touched && !this.submitted()) return '';
    if (control?.errors?.['required']) return 'El nombre es requerido';
    if (control?.errors?.['minlength']) return 'Mínimo 2 caracteres';
    return '';
  });

  lastNameError = computed(() => {
    const control = this.registerForm.get('lastName');
    if (!control?.touched && !this.submitted()) return '';
    if (control?.errors?.['required']) return 'El apellido es requerido';
    if (control?.errors?.['minlength']) return 'Mínimo 2 caracteres';
    return '';
  });

  emailError = computed(() => {
    const control = this.f['email'];
    if (!control?.touched && !this.submitted()) return '';
    if (control?.errors?.['required']) return 'El email es requerido';
    if (control?.errors?.['email']) return 'Ingresa un email válido';
    return '';
  });

  passwordError = computed(() => {
    const control = this.f['password'];
    if (!control?.touched && !this.submitted()) return '';
    if (control?.errors?.['required']) return 'La contraseña es requerida';
    if (control?.errors?.['minlength']) return 'Mínimo 8 caracteres';
    if (control?.errors?.['pattern'])
      return 'Debe contener mayúsculas, minúsculas, números y símbolos';
    return '';
  });

  confirmPasswordError = computed(() => {
    const control = this.f['confirmPassword'];
    if (!control?.touched && !this.submitted()) return '';
    if (control?.errors?.['required']) return 'Confirma tu contraseña';
    if (control?.errors?.['passwordMismatch']) return 'Las contraseñas no coinciden';
    return '';
  });

  termsError = computed(() => {
    const control = this.f['terms'];
    if (!control?.touched && !this.submitted()) return '';
    if (control?.errors?.['required']) return 'Debes aceptar los términos y condiciones';
    return '';
  });

  // Computed signal para ver si la contraseña es válida
  isPasswordValid = computed(() => {
    return (
      this.hasUpperCase() &&
      this.hasLowerCase() &&
      this.hasNumbers() &&
      this.hasSpecialChar() &&
      this.hasMinLength()
    );
  });

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
    return null;
  }

  // Getter para acceder a los controles del formulario
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  togglePasswordVisibility() {
    this.passwordVisible.update((value) => !value);
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible.update((value) => !value);
  }

  // Marcar todos los campos como touched para mostrar errores
  markAllAsTouched() {
    Object.keys(this.registerForm.controls).forEach((key) => {
      this.registerForm.get(key)?.markAsTouched();
    });
  }

  onSubmit() {
    this.submitted.set(true);
    this.markAllAsTouched();

    if (this.registerForm.valid) {
      // Aquí iría la lógica para enviar los datos al servidor
      console.log('Formulario válido:', this.registerForm.value);

      // Ejemplo de cómo acceder a los valores de forma typesafe
      const formValue = this.registerForm.value;
      console.log('Email:', formValue.email);
      console.log('Nombre:', formValue.firstName);

      // this.authService.register(this.registerForm.value).subscribe(...)
    }
  }

  // Helper para clases condicionales
  hasError(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return (control?.touched || this.submitted()) && control?.invalid ? true : false;
  }

  // // Método para manejar el blur y marcar como touched
  // onFieldBlur(controlName: string) {
  //   this.registerForm.get(controlName)?.markAsTouched();
  // }
}
