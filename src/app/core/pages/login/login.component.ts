import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { AlertsService } from '../../services/alerts/alerts.service';
import { DialogsService } from '../../services/dialogs/dialogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth/auth.service';

import * as _cc from '../../config/codes.config';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted = false;

  constructor(private httpClient: HttpClient,
              private loginService: LoginService,
              private authService: AuthService,
              private alertsService: AlertsService,
              private dialogService: DialogsService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private titleService: Title) {

    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });

    this.titleService.setTitle('Northern Stars » Login');

  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit() {
  }

  onSubmit(input) {

    if (!this.loginForm.valid) {
      this.username.markAsTouched();
      this.password.markAsTouched();
    } else {
      if (!this.submitted) {
        this.callLoginSvc(input);
        this.submitted = true;
      }
    }

  }

  // TODO - interface
  callLoginSvc(input) {
    this.loginService.logInRequest(input).subscribe(response => {

      if (response.response.success && response.token) {
        AuthService.storeUserData(response.user, response.token);
        this.alertsService.alertSuccess({
          title: 'Logged In',
          body: 'You\'ve been successfully logged in!'
        }, 2500);
        const returnUrl = this.route.snapshot.queryParamMap.has('return') ? this.route.snapshot.queryParamMap.get('return') : false;
        this.router.navigate([returnUrl || '/']);
      } else {
        // no token or success
        this.submitted = false;
        this.alertsService.alertDanger({
          title: response.response.name || 'Unexpected',
          body: response.response.message || 'Unexpected error occurred.'
        }, 5000);
      }

    }, error => {
      error = !!error.error ? !!error.error.response ? error.error.response : error.error : error;
      this.submitted = false;

      switch (error.name) {
        case _cc.getCodeByName('USERNAME_MISMATCH').name: {
          this.username.setErrors({ 'no-match' : true }); break;
        }
        case _cc.getCodeByName('PASSWORD_MISMATCH').name: {
          this.password.setErrors({ 'no-match' : true }); break;
        }
        default: {
          this.alertsService.alertDanger({
            title: error.name || error.status || 'Error',
            body: error.message || JSON.stringify(error) || 'Unidentified error'
          }, 5000);
          break;
        }
      }

    });
  }

}