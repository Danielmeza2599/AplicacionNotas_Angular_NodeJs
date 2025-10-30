import { Routes } from '@angular/router';

// 1. Importar los componentes que actuarán como "páginas"
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './layout/main/main.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { NavbarwelcomeComponent } from './layout/navbars/navbarwelcome/navbarwelcome.component';

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
  {
    path: 'registro', // Cuando la URL sea /register
    component: RegistroComponent, // Se muestra este componente
  },
  {
    path: 'welcome', // Cuando la URL sea /register
    component: NavbarwelcomeComponent, // Se muestra este componente
  },
  
  // --- Rutas de redirección ---
  {
    path: '', // Si la URL está vacía (ej: http://localhost:4200/)
    redirectTo: 'welcome', // Redirige automáticamente a /Bienvenida WElcome
    pathMatch: 'full', // 'full' significa que debe coincidir exactamente con la ruta vacía
  },
  {
    path: '**', // El 'comodín' o 'catch-all'.
    redirectTo: 'welcome', // Si el usuario escribe cualquier otra cosa (ej: /contacto, /perfil)
                        // lo redirigirá a /welcome.
  },   
];
