import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent {
  resetForm: FormGroup;

  ngOnInit() {
    (this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      user_id: ['', Validators.required],
    })),
      { validator: this.passwordMatchValidator };
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      user_id: ['', Validators.required],
    });
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password!.value !== confirmPassword!.value) {
      confirmPassword!.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword!.setErrors(null);
    }
  }

  onSubmit() {
    // console.log(this.resetForm.value);

    if (this.resetForm.valid) {
      const { confirmPassword, ...userDetails } = this.resetForm.value;

      this.userService.resetPassword(userDetails).subscribe(
        (response) => {
          if (response.message) {
            Swal.fire({
              icon: 'success',
              title: 'You have updated password Successfully',
              text: `${response.message}`,
              didRender: () => {
                const successMessage = document.querySelector('.swal2-title');
                successMessage!.setAttribute('data-cy', 'reset-success-popup');
              },
            });
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          }
          if (response.error) {
            Swal.fire({
              icon: 'error',
              title: 'Please try Again',
              text: `${response.error}`,
              didRender: () => {
                const errorMessage = document.querySelector('.swal2-title');
                errorMessage!.setAttribute('data-cy', 'reset-error-popup');
              },
            });
            setTimeout(() => {
              this.resetForm.reset();
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
}
