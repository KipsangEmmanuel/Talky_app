import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent {
  forgotForm!: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit = () => {
    if (this.forgotForm.valid) {
      this.userService.forgotPassword(this.forgotForm.value).subscribe(
        (res) => {
          // console.log(res);

          if (res.message) {
            Swal.fire({
              title: 'Success!',
              text: `${res.message}`,
              icon: 'success',
              confirmButtonText: 'Ok',
              didRender: () => {
                const successMessage = document.querySelector('.swal2-title');
                successMessage!.setAttribute('data-cy', 'forgot-success-popup');
              },
            }).then((result) => {
              this.router.navigate(['/reset']);

              this.forgotForm.reset();
            });
          }

          if (res.error) {
            Swal.fire({
              title: 'Error!',
              text: `${res.error}`,
              icon: 'error',
              confirmButtonText: 'Ok',
              didRender: () => {
                const errorMessage = document.querySelector('.swal2-title');
                errorMessage!.setAttribute('data-cy', 'forgot-error-popup');
              },
            }).then((result) => {
              this.forgotForm.reset();
            });
          }
        },
        (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'enter a valid email!',
            icon: 'error',
            confirmButtonText: 'Ok',
          }).then((result) => {
            this.forgotForm.reset();
          });
        }
      );
    }
  };
}
