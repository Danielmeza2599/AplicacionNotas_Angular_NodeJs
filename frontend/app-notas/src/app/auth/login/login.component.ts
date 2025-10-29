import { Component, inject } from '@angular/core';
import { Router } from '@angular/router'; // 1. ¡Importar el Router!

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // 2. Se inyecta el servicio Router
  // 'inject(Router)' es la forma moderna de inyección de dependencias.
  // Alternativa (clásica): constructor(private router: Router) {}
  private router = inject(Router);
  // 3. Define la función login() que se decalro en el (ngSubmit) HTML
  login() {
    console.log('Botón de login presionado');
    console.log('Simulando inicio de sesión exitoso...');//Pruebas

    // 3. ¡La magia de la navegación!
    // Le decimos al Router que navegue a la ruta '/home'.
    // El Router buscará '/home' en `app.routes.ts`, encontrará
    // que le corresponde `HomeComponent` y lo mostrará
    // en el `<router-outlet>`.
    this.router.navigate(['/home']);
    
  }
}
