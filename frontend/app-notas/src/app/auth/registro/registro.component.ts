import { Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ¡Importar el Router!

@Component({
  selector: 'app-registro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  private router = inject(Router);

  registerForm: FormGroup;

  login(){
    this.router.navigate(['/login']);// Redirigir al login
  }

  // Signals para estado reactivo
  submitted = signal(false);
  passwordVisible = signal(false);
  confirmPasswordVisible = signal(false);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]')
      ]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Computed signals para errores
  firstNameError = computed(() => {
    if (!this.submitted()) return '';
    const errors = this.registerForm.get('firstName')?.errors;
    if (errors?.['required']) return 'El nombre es requerido';
    if (errors?.['minlength']) return 'Mínimo 2 caracteres';
    return '';
  });

  lastNameError = computed(() => {
    if (!this.submitted()) return '';
    const errors = this.registerForm.get('lastName')?.errors;
    if (errors?.['required']) return 'El apellido es requerido';
    if (errors?.['minlength']) return 'Mínimo 2 caracteres';
    return '';
  });

  emailError = computed(() => {
    if (!this.submitted()) return '';
    const errors = this.registerForm.get('email')?.errors;
    if (errors?.['required']) return 'El email es requerido';
    if (errors?.['email']) return 'Ingresa un email válido';
    return '';
  });

  passwordError = computed(() => {
    if (!this.submitted()) return '';
    const errors = this.registerForm.get('password')?.errors;
    if (errors?.['required']) return 'La contraseña es requerida';
    if (errors?.['minlength']) return 'Mínimo 8 caracteres';
    if (errors?.['pattern']) return 'Debe contener mayúsculas, minúsculas, números y símbolos';
    return '';
  });

  confirmPasswordError = computed(() => {
    if (!this.submitted()) return '';
    const errors = this.registerForm.get('confirmPassword')?.errors;
    if (errors?.['required']) return 'Confirma tu contraseña';
    if (errors?.['passwordMismatch']) return 'Las contraseñas no coinciden';
    return '';
  });

  termsError = computed(() => {
    if (!this.submitted()) return '';
    const errors = this.registerForm.get('terms')?.errors;
    if (errors?.['required']) return 'Debes aceptar los términos y condiciones';
    return '';
  });

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible.update(value => !value);
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible.update(value => !value);
  }

  onSubmit() {
    this.submitted.set(true);

    if (this.registerForm.valid) {
      // Aquí iría la lógica para enviar los datos al servidor
      console.log('Formulario válido:', this.registerForm.value);
      // this.authService.register(this.registerForm.value).subscribe(...)
    }
  }

  // Helper para clases condicionales
  hasError(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return this.submitted() && control ? control.invalid : false;
  }

}
