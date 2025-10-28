import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarwelcomeComponent } from "./layout/navbars/navbarwelcome/navbarwelcome.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarwelcomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('app-notas');
}
