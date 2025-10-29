import { Routes } from '@angular/router';

// 1. Importar los componentes que actuarán como "páginas"
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './layout/main/main.component';

// 2. Este es el "mapa" del sitio web.
// Es un array de objetos donde cada objeto define una ruta.
export const routes: Routes = [
    {
    path: 'login', // Cuando la URL sea /login
    component: LoginComponent, // Se muestra este componente
  },
  {
    path: 'home', // Cuando la URL sea /home
    component: MainComponent, // Se muestra este componente
  },
  
  // --- Rutas de redirección ---
  {
    path: '', // Si la URL está vacía (ej: http://localhost:4200/)
    redirectTo: 'login', // Redirige automáticamente a /login
    pathMatch: 'full', // 'full' significa que debe coincidir exactamente con la ruta vacía
  },
  {
    path: '**', // El 'comodín' o 'catch-all'.
    redirectTo: 'login', // Si el usuario escribe cualquier otra cosa (ej: /contacto, /perfil)
                        // lo redirigirá a /login.
  },   
];
