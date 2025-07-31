import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router) {}

  logout() {
    // Clear any stored user data
    localStorage.clear();
    sessionStorage.clear();
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }
}