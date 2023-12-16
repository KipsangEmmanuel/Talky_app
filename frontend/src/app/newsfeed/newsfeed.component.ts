import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CloudinaryService } from '../services/cloudinary/cloudinary.service';
import { PostDetails } from '../interfaces/post';
import { PostService } from '../services/post/post.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css'],
})
export class NewsfeedComponent implements OnInit {
  selectedPostType: string = 'text';
  selectedFile: Observable<string | ArrayBuffer | null> | null = null;
  postFiles: any[] = [];
  postForm!: FormGroup;
  posts: any[] = [];
  token: string | null = localStorage.getItem('token');

  constructor(
    private formBuilder: FormBuilder,
    private upload: CloudinaryService,
    private postService: PostService
  ) {
    this.postForm = this.formBuilder.group({
      postImage: [],
      caption: '',
    });
  }
  ngOnInit() {
    this.fetchPosts();
  }
  onSelectPostImage(event: any) {
    // console.log(event);
    this.postFiles.push(...event.addedFiles);
  }

  onRemovePostImage(event: any) {
    console.log(event);
    this.postFiles.splice(this.postFiles.indexOf(event), 1);
  }

  sharePost() {
    // Your logic to share the post
    console.log(this.postForm.value);

    if (this.postForm.valid) {
      const imageUrls: string[] = [];

      // Upload all images

      const data = new FormData();
      const file_data = this.postFiles[0];
      data.append('file', file_data);
      data.append('upload_preset', 'xznu6cwm');
      data.append('cloud_name', 'drkjise3u');

      this.upload.uploadImage(data).subscribe((res) => {
        console.log(res.secure_url);

        this.postForm.value.postImage = res.secure_url;

        // Create the post
        let details: PostDetails = this.postForm.value;

        console.log(details);

        const user_id = localStorage.getItem('user_id');

        if (!this.token) {
          console.log('there is no token');
          return;
        }

        if (user_id !== null) {
          details.created_by_user_id = user_id;
        } else {
          console.log('There is no token or user_id');
          return;
        }

        this.postService.createPost(details, this.token).subscribe(
          (response) => {
            console.log(response);

            this.postForm.reset();
            this.postFiles = []; // Clear the array of uploaded files
          },
          (error) => {
            console.log(error);

            // Handle error
            // console.error('Error submitting form:', error);
          }
        );
      });
    }
  }

  fetchPosts() {
    if (!this.token) {
      console.error('Token not found.');
      return;
    }

    try {
      this.postService.getAllPosts(this.token).subscribe((res) => {
        console.log(res);
        this.posts = res;
      });

    } catch (error) {
      console.log(error);
    }
  }
}
