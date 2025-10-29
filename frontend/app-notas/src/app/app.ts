import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarwelcomeComponent } from "./layout/navbars/navbarwelcome/navbarwelcome.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('app-notas');

  misMenuItems: any[] = [
    { name: 'Home', route: '/'}
  ];

  clickLogin(){
    // TODO = Armando
    console.log(`Mostrar formulario de Login`);
  }

  clickSignUp(){
    // TODO = Tocayo
    console.log(`Mostrar formulario de registro`);
  }
}
