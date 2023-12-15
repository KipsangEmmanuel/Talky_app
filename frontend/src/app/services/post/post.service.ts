import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../../interfaces/comment';
import { PostDetails } from 'src/app/interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(post: PostDetails) {
    return this.http.post('http://localhost:4400/post/', post);
  }

  createComment(comment: Comment) {
    return this.http.post('http://localhost:4400/post/comment', comment);
  }

  followingPosts(following_user_id: string) {
    return this.http.get(`http://localhost:4400/post/${following_user_id}`);
  }
}
