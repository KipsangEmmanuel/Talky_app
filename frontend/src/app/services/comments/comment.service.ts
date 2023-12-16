import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment, subComment } from 'src/app/interfaces/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseUrl = 'http://localhost:4201/comment';

  // Helper function to get headers with token
  private getHeadersWithToken(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      token: token,
    });
  }

  constructor(private http: HttpClient) {}

  createComment(commentData: Comment, token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, commentData, {
      headers: this.getHeadersWithToken(token),
    });
  }

  createSubComment(subCommentData: subComment, token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, subCommentData, {
      headers: this.getHeadersWithToken(token),
    });
  }

  editComment(commentData: any, token: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/`, commentData, {
      headers: this.getHeadersWithToken(token),
    });
  }

  deleteComment(commentId: string, token: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${commentId}`, {
      headers: this.getHeadersWithToken(token),
    });
  }

  getPostComments(postId: string, token: string): Observable<any> {
    // console.log(postId);

    return this.http.get(`${this.baseUrl}/${postId}`, {
      headers: this.getHeadersWithToken(token),
    });
  }
}
