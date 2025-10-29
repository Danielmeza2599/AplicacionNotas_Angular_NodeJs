import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

// 1. Importar rutas definidas
import { routes } from './app.routes';

// Este es el archivo de configuración de una app STANDALONE.
// Reemplaza al antiguo `app.module.ts`.
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    // 2. Aquí se "provee" o se "activa" el enrutador
    // en la aplicación, pasándole el mapa de rutas.
    provideRouter(routes)
  ]
};
