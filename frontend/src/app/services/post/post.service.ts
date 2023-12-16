import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostDetails, updatePost } from 'src/app/interfaces/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'http://localhost:4201/post';

  // Helper function to get headers with token
  private getHeadersWithToken(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      token: token,
    });
  }

  constructor(private http: HttpClient) {}

  createPost(postData: PostDetails, token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, postData, {
      headers: this.getHeadersWithToken(token),
    });
  }

  updatePost(postData: updatePost, token: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/`, postData, {
      headers: this.getHeadersWithToken(token),
    });
  }

  deletePost(postId: string, token: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${postId}`, {
      headers: this.getHeadersWithToken(token),
    });
  }

  getAllPosts(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}`, {
      headers: this.getHeadersWithToken(token),
    });
  }

  getOnePost(postId: string, token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${postId}`, {
      headers: this.getHeadersWithToken(token),
    });
  }

  toggleLikePost(
    postId: string,
    userId: string,
    token: string
  ): Observable<any> {
    const body = { post_id: postId, user_id: userId };
    return this.http.post(`${this.baseUrl}/toggleLikePost`, body, {
      headers: this.getHeadersWithToken(token),
    });
  }

  getPostLikes(postId: string, token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/like/${postId}`, {
      headers: this.getHeadersWithToken(token),
    });
  }
}
