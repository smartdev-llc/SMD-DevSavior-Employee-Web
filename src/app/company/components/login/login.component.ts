import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppErrors } from '../../../core/error/app-errors';
import { Forbidden } from '../../../core/error/forbidden';
import { InternalServer } from '../../../core/error/internal-server';
import { LanguageService } from '../../../layout/services/language.service';
import { Unauthorized } from '../../../core/error/unauthorized';
import {BadRequest} from '../../../core/error/bad-request';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginInForm: FormGroup;
  loginSubs: Subscription;
  isNotVerified = false;
  isLoading = false;
  isSubmited = false;
  formErrorMessage: string;
  isResendEmailSuccess = false;
  isEnLang: boolean = false;
  returnUrl: string;
  isNotApproval = false;
  isRedirectChangePassword = false;

  constructor(
    private languageService: LanguageService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { const lang = languageService.getCachedLanguage()
    languageService.setDefaultLang()
    if (lang === 'en') {
      this.isEnLang = true
    } }

  ngOnInit() {
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/jobs/ALL';
    const redirectParam = this.route.snapshot.queryParams['redirect'];
    this.isRedirectChangePassword = redirectParam === ChangePasswordComponent.CHANGE_PASSWORD_REDIRECT;
  }

  initForm() {
    this.loginInForm = this.fb.group({
      'email': ['',[Validators.email, Validators.required]],
      'password': ['', Validators.required]
    });
  }
    changeLanguage(language: string): void {
    this.languageService.changeLanguage(language).subscribe(() => {
      language === 'en' ? this.isEnLang = true : this.isEnLang = false;
    });
  }

  get email() {
    return this.loginInForm.get('email');
  }

  get password() {
    return this.loginInForm.get('password');
  }
  onSubmit() {
    let values = this.loginInForm.value;

    this.isSubmited = true;
    this.formErrorMessage = '';
    this.isResendEmailSuccess = false;
    this.isNotVerified = false;
    this.isNotApproval = false;


    if (this.loginInForm.invalid) {
      // console.log('error', this.loginInForm);

    } else {
      this.isLoading = true;
      this.authService
        .loginCompany(values)
        .subscribe(user => {
          this.isLoading = false;
          this.authService.setTokenInLocalStorage(user, false);
          this.router.navigateByUrl(this.returnUrl);
        },
          (error: AppErrors) => {
            this.handleErrorLoginComponent(error);
          });
    }

  }

  resendEmail(email: HTMLInputElement) {
    this.isLoading = true;

    this.authService
      .resendEmail(email.value, 'company')
      .subscribe(
        message => {
          if (message) {
            this.isLoading = false;
            this.isNotVerified = false;
            this.isNotApproval = false;
            this.isResendEmailSuccess = true;
          }
        },
        this.handleErrorLoginComponent
      );
  }

  handleErrorLoginComponent(error: AppErrors) {
    this.isLoading = false;

    if (error instanceof InternalServer) {
    }
    else if (error instanceof Unauthorized) {
      this.formErrorMessage = error.originalError;
    }
    else if (error instanceof Forbidden) {
      if (error.originalError === 'UNAPPROVED_ACCOUNT') {
        this.isNotApproval = true;
      }else if (error.originalError === 'UNVERIFIED_EMAIL'){
        this.isNotVerified = true;
      }
    }
    else if (error instanceof BadRequest) {
      this.formErrorMessage = error.originalError;
    }
    else {
      throw error;
    }
  }
}
