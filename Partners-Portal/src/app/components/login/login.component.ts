import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router) {}

  onLogin() {
    // Simple login logic - in real app, validate credentials
    if (this.email && this.password) {
      this.router.navigate(['/dashboard']);
    }
  }

  goToReset() {
    // Navigate to reset password page
    console.log('Navigate to reset password');
  }

  goToRegister() {
    // Navigate to register page
    console.log('Navigate to register page');
  }
}