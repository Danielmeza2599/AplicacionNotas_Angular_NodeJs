import { Component, inject } from '@angular/core';
import { Router } from '@angular/router'; // ¡Importar el Router!

@Component({
  selector: 'app-navbarwelcome',
  standalone: true,
  imports: [],
  templateUrl: './navbarwelcome.component.html',
  styleUrl: './navbarwelcome.component.scss',
})
export class NavbarwelcomeComponent {
  private router = inject(Router);

  login() {
    console.log('Ingresando al login');//Pruebas
    this.router.navigate(['/login']);// Redirigir al login
  }
  
  signup() {
    console.log('Ingresando al registro');//Pruebas
    this.router.navigate(['/registro']);// Redirigir al registro
  }
}
