import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbarwelcome',
  imports: [],
  templateUrl: './navbarwelcome.component.html',
  styleUrl: './navbarwelcome.component.scss',
})
export class NavbarwelcomeComponent {
  /* Exponer entradas y salidas del comonente */
  // INPUTS
  @Input() menuItems: any[] =[];
  @Input() loginLable: string = 'Login';
  @Input() signUpLabel: string = 'SignUp';

  // OUTPUTS
  @Output() _onClickLogin = new EventEmitter<void>
  @Output() _onClickSignUp = new EventEmitter<void>


  onClickLogin() {
    this._onClickLogin.emit();
  }

  onClickSignUp() {
    this._onClickSignUp.emit();
  }
}
