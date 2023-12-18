import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CloudinaryService } from '../services/cloudinary/cloudinary.service';
import { PostDetails } from '../interfaces/post';
import { PostService } from '../services/post/post.service';
import { CommentService } from '../services/comments/comment.service';
import { Comment, editComment } from '../interfaces/comment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css'],
})
export class NewsfeedComponent implements OnInit {
  isPostLiked: boolean = false;
  selectedPostType: string = 'text';
  selectedFile: Observable<string | ArrayBuffer | null> | null = null;
  postFiles: any[] = [];
  postForm!: FormGroup;
  commentForm!: FormGroup;
  posts: any[] = [];
  comments: any[] = [];
  token: string | null = localStorage.getItem('token');
  profilePic: string | null = localStorage.getItem('profilePic');
  userName: string | null = localStorage.getItem('user_name');
  totalLikes!: number;
  postDetails!: any;

  showEditCommentForm = false;
  editCommentForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private upload: CloudinaryService,
    private postService: PostService,
    private commentService: CommentService
  ) {
    this.postForm = this.formBuilder.group({
      postImage: '',
      caption: '',
    });
    this.commentForm = this.formBuilder.group({
      comment: '',
    });
    this.editCommentForm = this.formBuilder.group({
      updated_comment: '',
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

  toggleComments(post: any) {
    post.showComments = !post.showComments;
    // console.log(post);
  }

  toggleEditCommentForm(): void {
    this.showEditCommentForm = !this.showEditCommentForm;
  }

  sharePost() {
    // Your logic to share the post
    // console.log(this.postForm.value);

    if (this.postForm.valid) {
      // Upload all images

      if (this.postFiles.length === 0) {
        let details: PostDetails = this.postForm.value;
        // this.postForm.value.postImage = ''
        // console.log(details);

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
            // console.log(response);

            this.fetchPosts();
            this.postForm.reset();
            this.postFiles = []; // Clear the array of uploaded files
          },
          (error) => {
            console.log(error);

            // Handle error
            // console.error('Error submitting form:', error);
          }
        );
      } else {
        const data = new FormData();
        const file_data = this.postFiles[0];
        data.append('file', file_data);
        data.append('upload_preset', 'xznu6cwm');
        data.append('cloud_name', 'drkjise3u');

        this.upload.uploadImage(data).subscribe((res) => {
          // console.log(res.secure_url);

          this.postForm.value.postImage = res.secure_url;

          // Create the post
          let details: PostDetails = this.postForm.value;

          // console.log(details);

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
              // console.log(response);

              this.fetchPosts();
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

  fetchComments(post_id: string) {
    if (!this.token) {
      console.error('Token not found.');
      return;
    }

    try {
      this.commentService
        .getPostComments(post_id, this.token)
        .subscribe((res) => {
          // console.log(res);
          this.comments = res;
        });
    } catch (error) {
      console.log(error);
    }
  }

  createComment = (post_id: string) => {
    try {
      const user_id = localStorage.getItem('user_id');

      if (this.commentForm.valid) {
        let details: Comment = this.commentForm.value;

        if (!this.token) {
          console.log('there is no token');
          return;
        }

        details.post_id = post_id;

        if (user_id !== null) {
          details.created_by_user_id = user_id;
        } else {
          console.log('There is no token or user_id');
          return;
        }

        // console.log(details);

        this.commentService
          .createComment(details, this.token)
          .subscribe((res) => {
            // console.log(res);
            this.commentForm.reset();
            this.fetchComments(post_id);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteComment = async (comment_id: string, comment: string) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton:
            'btn btn-success text-white p-2 rounded m-2 cursor-pointer ',
          cancelButton:
            'btn btn-danger text-white p-2 rounded m-2  cursor-pointer ',
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: `Delete ${comment}! <br> Are you sure?`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it !',
          cancelButtonText: 'No, cancel !  ',
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            if (!this.token) {
              console.error('Token not found.');
              return;
            }
            this.commentService
              .deleteComment(comment_id, this.token)
              .subscribe((res) => {
                // console.log(res);
              });
            this.fetchPosts();

            swalWithBootstrapButtons.fire({
              title: 'Deleted!',
              text: `${comment} has been deleted.`,
              icon: 'success',
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: 'Cancelled',
              text: `${comment} is safe :)`,
              icon: 'error',
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  editComment = (comment_id: string, post_id: string) => {
    try {
      if (this.editCommentForm.valid) {
        let details: editComment = this.editCommentForm.value;

        if (!this.token) {
          console.log('there is no token');
          return;
        }

        details.comment_id = comment_id;

        console.log(details);

        this.commentService
          .editComment(details, this.token)
          .subscribe((res) => {
            if (res.message) {
              Swal.fire({
                icon: 'success',
                title: 'comment edited successfully!',
                text: `${res.message}`,
              });
            }
            this.showEditCommentForm = false;
            // console.log(res);
            this.editCommentForm.reset();
            this.fetchComments(post_id);
          });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong!',
        icon: 'error',
      });
    }
  };

  fetchSingleComment = (comment_id: string) => {
    try {
      if (!this.token) {
        console.error('Token not found.');
        return;
      }

      function getCommentById(
        commentId: string,
        comments: any[]
      ): Comment | undefined {
        return comments.find((comment) => comment.comment_id === commentId);
      }

      const desiredComment = getCommentById(comment_id, this.comments);

      // if (desiredComment) {
      //   console.log('Found comment:', desiredComment);
      // } else {
      //   console.log('Comment not found.');
      // }
      this.editCommentForm.patchValue({
        updated_comment: desiredComment!.comment,

        // console.log(this.editProductForm.value);
      });
    } catch (error) {
      console.log(error);
    }
  };
  toggleLike = (post_id: string) => {
    try {
      // this.fetchPostDetails(post_id)
      const user_id: string | null = localStorage.getItem('user_id');

      // this.getTotalLikes(post_id);

      if (user_id !== null && this.token !== null) {
        this.postService
          .toggleLikePost(post_id, user_id, this.token)
          .subscribe((res) => {
            console.log(res);

            this.fetchPosts()

            // Check the response and update isPostLiked accordingly
            this.isPostLiked = res.message === 'Post Liked';
          });
      } else {
        console.log('There is no token or user_id');
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchPostDetails(post_id: string) {
    try {
      if (!this.token) {
        console.error('Token not found.');
        return;
      }
      this.postService.getPostdetails(post_id, this.token).subscribe(
        (data) => {
          this.postDetails = data;

          // console.log(post_id);
        },
        (error) => {
          console.error('Error fetching post details:', error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // getTotalLikes = (post_id: string) => {
  //   try {
  //     if (!this.token) {
  //       console.log('there is no token');
  //       return;
  //     }

  //     this.postService.getPostLikes(post_id, this.token).subscribe((res) => {
  //       console.log(res);

  //       if (!res.likes) {
  //         console.log('no likes on the posts');
  //       } else {
  //         res.likes.likes.length = this.totalLikes;
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
}
