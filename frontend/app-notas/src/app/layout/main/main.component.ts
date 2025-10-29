import { Component } from '@angular/core';
import { NavbarwelcomeComponent } from "../navbars/navbarwelcome/navbarwelcome.component";
import { WelcomeComponent } from "../welcome/welcome.component";

@Component({
  selector: 'app-main',
  imports: [WelcomeComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {

}
