import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.registrationForm = this.fb.group(
      {
        user_name: ['', Validators.required],
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
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

    console.log(this.registrationForm.value);
    
    if (this.registrationForm.valid) {
      const { confirmPassword, ...userDetails } = this.registrationForm.value;
      // console.log(userDetails);

      // Call your user service to register the user
      this.userService
        .registerUser(userDetails)
        .subscribe((response) => {
          // Handle the response as needed
          console.log(response);

          if (response.message) {
            Swal.fire({
              icon: 'success',
              title: 'You have registered Successfully',
              text: `${response.message}`,
              timer: 2000,
              didRender: () => {
                const successMessage = document.querySelector('.swal2-title');
                successMessage!.setAttribute(
                  'data-cy',
                  'registered-success-popup'
                );
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
                errorMessage!.setAttribute('data-cy', 'registered-error-popup');
              },
            });
            setTimeout(() => {
              this.registrationForm.reset();
            }, 5000);
          }
        }, (error) => {
          // Handle errors
          console.log(error);
        })
    }
  }
}
