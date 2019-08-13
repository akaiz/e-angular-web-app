import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interface/user';
import { AuthService } from '../services/auth.service';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  title = 'esto';
  signUpUser = null;
  loginUser = null;
  isLoginSubmitted = false;
  isSignUpSubmitted = false;
  invalidCredentials = false;
  invalidSignUpDetails = false;
  signUpEmailExists = false;
  signUpIncomeError = false;
  signUpIncomeErrorMessage = '';
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {}
  get loginFormControls() {
    return this.loginUser.controls;
  }
  get signUpFormControls() {
    return this.signUpUser.controls;
  }
  public ngOnInit() {
    this.signUpUser = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      income: new FormControl('', [Validators.required, Validators.maxLength(7)]),
    });
    this.loginUser = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.styleSetUp();
  }

  onSignUp() {
    this.isSignUpSubmitted = true;
    this.invalidSignUpDetails = false;
    this.signUpEmailExists = false;
    this.signUpIncomeError = false;
    this.signUpIncomeErrorMessage = '';
    if (this.signUpUser.invalid) {
      return;
    }
    this.authService
      .register(this.signUpUser.value)
      .then(data => {
        this.gotoUserProfile(data);
      })
      .catch(error => {
        Object.keys(error).map(key => {
          if (error[key]) {
            error[key].map(reason => {
              if (reason === 'The email has already been taken.') {
                this.signUpEmailExists = true;
              }
              if (key === 'income') {
                this.signUpIncomeError = true;
                this.signUpIncomeErrorMessage = reason;
              }
            });
          }
        });
      });
  }
  onLogin() {
    this.isLoginSubmitted = true;
    this.invalidCredentials = false;
    if (this.loginUser.invalid) {
      return;
    }
    this.authService
      .login(this.loginUser.value)
      .then(data => {
        this.gotoUserProfile(data);
      })
      .catch(message => {
        if (message === 'invalid_credentials') {
          this.invalidCredentials = true;
        }
      });
  }
  private gotoUserProfile(data: unknown) {
    if (data === 'success') {
      this.router.navigateByUrl('/profile');
    }
  }

  private styleSetUp() {
    $('#signIn').click(() => {
      $('#container').addClass('right-panel-active');
    });
    $('#signUp').click(() => {
      $('#container').removeClass('right-panel-active');
      $('.sign-up-container').css('z-index', 200);
    });
  }
}
