// Import necessary modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Base URL for the API
  private baseUrl = 'http://localhost:4201/user';

  constructor(private http: HttpClient) {}

  // Register user
  registerUser(user: any): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, user, { headers: this.getHeaders() });
  }

  // Get all users
  getAllUsers(token: string): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.get(url, { headers: this.getHeadersWithToken(token) });
  }

  // Get one user by ID
  getUserById(userId: string, token: string): Observable<any> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http.get(url, { headers: this.getHeadersWithToken(token) });
  }

  // Login user
  loginUser(credentials: any): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, credentials, { headers: this.getHeaders() });
  }

  // Update user
  updateUser(user: any, token: string): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.put(url, user, {
      headers: this.getHeadersWithToken(token),
    });
  }

  // Delete user by ID
  deleteUserById(userId: string, token: string): Observable<any> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http.delete(url, { headers: this.getHeadersWithToken(token) });
  }

  // Check user details
  checkUserDetails(token: string): Observable<any> {
    // console.log(token);
    
    const url = `${this.baseUrl}/check_user_details`;
    return this.http.get(url, { headers: this.getHeadersWithToken(token) });
  }

  // Forgot password
  forgotPassword(email: string): Observable<any> {
    // console.log(email);
    
    const url = `${this.baseUrl}/forgot`;
    return this.http.post(url, email, { headers: this.getHeaders() });
  }

  // Reset password
  resetPassword(user: any): Observable<any> {
    const url = `${this.baseUrl}/reset`;
    return this.http.post(url, user, { headers: this.getHeaders() });
  }

  // Helper function to get headers
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  // Helper function to get headers with token
  private getHeadersWithToken(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      token: token
    });
  }
}
