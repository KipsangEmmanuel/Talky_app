import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    // Call your login service with the form data
    this.loginService.loginUser(this.loginForm.value).subscribe(
      (response) => {
        // Handle successful login
        // console.log(response);

        if (response.message) {
          if (response.token) {
            localStorage.setItem('token', response.token);
          }

          // console.log(response.token);
          

          Swal.fire({
            icon: 'success',
            title: 'You have Logged In Successfully',
            text: `${response.message}`,
            timer: 2000,
            didRender: () => {
              const successMessage = document.querySelector('.swal2-title');
              successMessage!.setAttribute(
                'data-cy',
                'logged-in-success-popup'
              );
            },
          });

          this.loginService
            .checkUserDetails(response.token)
            .subscribe((data) => {
              // console.log(data);

              if ('info' in data) {
               
                  localStorage.setItem('user_name', data.info.user_name!);
                localStorage.setItem('user_id', data.info.user_id);
                localStorage.setItem('profilePic', data.info.profileImage);
                  this.router.navigate(['/newsfeed']);
                // }
              }
            });
        }
        if (response.error) {
          Swal.fire({
            icon: 'error',
            title: 'Please try Again',
            text: `${response.error}`,
            didRender: () => {
              const errorMessage = document.querySelector('.swal2-title');
              errorMessage!.setAttribute('data-cy', 'logged-in-error-popup');
            },
          });
          setTimeout(() => {
            this.loginForm.reset();
          }, 5000);
        }
      },
      (error) => {
        // Handle errors
        console.log(error);
      }
    );
  }
}
