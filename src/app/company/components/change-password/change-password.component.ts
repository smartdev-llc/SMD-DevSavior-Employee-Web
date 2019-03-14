import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchingPasswordValidator } from '../../../auth/validators/matching-password.directive';
import { AppErrors } from '../../../core/error/app-errors';
import { BadRequest } from '../../../core/error/bad-request';
import { InternalServer } from '../../../core/error/internal-server';
import { Unauthorized } from '../../../core/error/unauthorized';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public static CHANGE_PASSWORD_REDIRECT = 'change-password';
  static MIN_LENGTH_PASSWORD = 8;
  loading = false;
  changePassForm: FormGroup;
  submitted = false;
  isSucceed = false;

  constructor(formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.changePassForm = formBuilder.group(
      {
        oldPassword: ['', [Validators.required]],
        password: [
          '',
          [Validators.required, Validators.minLength(ChangePasswordComponent.MIN_LENGTH_PASSWORD)]
        ],
        repeatPassword: ['', Validators.required]
      },
      {
        validator: matchingPasswordValidator
      }
    );
  }

  submitChangePassword() {
    this.submitted = false;
    this.isSucceed = false;
    if (!this.changePassForm.valid) {
      return;
    }

    this.loading = true;
    const data = {
      password: this.controls.oldPassword.value,
      newPassword: this.controls.password.value
    };

    this.authService.changePassword(data).subscribe(
      (response) => {
        this.authService.removeTokens();
        this.router.navigate(['/login'], {
          queryParams: { redirect: ChangePasswordComponent.CHANGE_PASSWORD_REDIRECT }
        });
      },
      (error: AppErrors) => this.handleError(error)
    );

    this.submitted = true;
  }

  handleError(error: AppErrors) {
    this.loading = false;
    let serverError = undefined;
    switch (error.constructor) {
      case InternalServer:
        serverError = 'Opps! Something wrong. Please try again later.';
        break;

      case BadRequest:
      case Unauthorized:
        serverError = error.originalError;
        break;
    }

    this.changePassForm.setErrors({
      serverError: serverError
    });
  }

  ngOnInit() {}

  get controls() {
    return this.changePassForm.controls;
  }

  get hasServerError() {
    return (
      this.submitted &&
      this.changePassForm.errors != null &&
      this.changePassForm.errors.serverError != null
    );
  }
}
