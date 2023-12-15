import { Component } from '@angular/core';
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
export class NewsfeedComponent {
  selectedPostType: string = 'text';
  selectedFile: Observable<string | ArrayBuffer | null> | null = null;
  postFiles: any[] = [];
  postForm!: FormGroup;

  constructor (private formBuilder: FormBuilder,private upload: CloudinaryService, private postService: PostService) {
    this.postForm = this.formBuilder.group({
      postImage: [],
      postType: 'Post', 
      caption: '',
    });
  }

  onSelectPostImage(event: any) {
    console.log(event);
    this.postFiles.push(...event.addedFiles);
  }

  onRemovePostImage(event: any) {
    console.log(event);
    this.postFiles.splice(this.postFiles.indexOf(event), 1);
  }

  // onSubmit() {
  //   // Implement your submit logic based on the selected post type
  //   console.log('Submitting post of type:', this.selectedPostType);
  // }

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
          imageUrls.push(res.secure_url);

          // If all images are uploaded, proceed to createPost
          if (imageUrls.length === this.postFiles.length) {
            // Set the array of image URLs in the form
            this.postForm.value.postImage = imageUrls;

            // Create the post
            let details: PostDetails = this.postForm.value;
            details.created_at = new Date().toISOString();
            details.created_by_user_id = 'Robin';

            this.postService.createPost(details).subscribe(
              (response) => {
                console.log(response);

                // Clear the form or take other actions as needed
                this.postForm.reset();
                this.postFiles = []; // Clear the array of uploaded files
              },
              (error) => {
                // Handle error
                console.error('Error submitting form:', error);
              }
            );
          }
        });
      
    }
  }
}
