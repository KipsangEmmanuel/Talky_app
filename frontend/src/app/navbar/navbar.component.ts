import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor (private router: Router) { }
  
  logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    this.router.navigate(['/login']);
    
    // console.log(localStorage.getItem('token'));
  };
  isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
  };
}
