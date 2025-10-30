import { Component, inject } from '@angular/core';
import { Router } from '@angular/router'; // ¡Importar el Router!

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  private router = inject(Router);
  login() {
    console.log('Cerrando sesion');//Pruebas
    console.log('regresar al login');//Pruebas

    this.router.navigate(['/login']);
    // TODO: Realizar la logica para cerrar sesion, con el servidor
  }
}
