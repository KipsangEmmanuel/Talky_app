import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private baseUrl = 'http://localhost:4201';

  // Helper function to get headers with token
  private getHeadersWithToken(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      token: token,
    });
  }

  constructor(private http: HttpClient) {}

  followUser(
    follower_id: string,
    following_id: string,
    token: string
  ): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/follow`,
      { follower_id, following_id },
      {
        headers: this.getHeadersWithToken(token),
      }
    );
  }
  getFollowedUsers(loggedInUserID: string, token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/followed/${loggedInUserID}`, {
      headers: this.getHeadersWithToken(token),
    });
  }

  getFollowers(loggedInUserID: string, token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getFollowers/${loggedInUserID}`, {
      headers: this.getHeadersWithToken(token),
    });
  }
  getFollowings(loggedInUserID: string, token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getFollowings/${loggedInUserID}`, {
      headers: this.getHeadersWithToken(token),
    });
  }

  unfollowUser(
    follower_id: string,
    following_id: string,
    token: string
  ): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/unfollow`,
      { follower_id, following_id },
      {
        headers: this.getHeadersWithToken(token),
      }
    );
  }
}
