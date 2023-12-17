import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  profilePic: string | null = localStorage.getItem('profilePic')
  
  user_name : string|null = localStorage.getItem('user_name')
  constructor (private router: Router) { }
  
  logoutUser = () => {
    localStorage.clear();
    this.router.navigate(['/login']);
    
    // console.log(localStorage.getItem('token'));
  };
  isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
  };
}
