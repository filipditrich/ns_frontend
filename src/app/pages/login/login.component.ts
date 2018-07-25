import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AlertsService} from '../../midpoint/alerts/alerts.service';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import {AuthService} from '../../midpoint/auth/auth.service';
import { Router } from '@angular/router';
import * as CODE_CONF from '../../midpoint/config/codes/codes.dev';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private alertsService: AlertsService,
              private fb: FormBuilder,
              private router: Router) {

    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });

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
      this.callLoginSvc(input);
    }

  }

<<<<<<< HEAD
        if (response.response.success && response.token) {
          this.authService.storeUserData(response.user, response.token);
          this.alertsService.alertSuccess({title: 'Logged In', body: 'You\'ve been successfully logged in!'}, 2500);
          this.router.navigate(['/dashboard']);
        } else {
          this.alertsService.alertDanger({title: 'Unexpected Error', body: 'An unexpected error occurred: 0x00E'}, 5000);
        }
=======
  callLoginSvc(input) {
    this.authService.logIn(input).subscribe(response => {
>>>>>>> af403e416e3eaf234a83a1ed27c682b884b9c85d

      if (response.response.success && response.token) {
        this.authService.storeUserData(response.user, response.token);
        this.alertsService.alertSuccess({title: 'Logged In', body: 'You\'ve been successfully logged in!'}, 2500);
        this.router.navigate(['/'])
      } else {
        // no token or success
        this.alertsService.alertDanger({ title: response.response.name || 'Unexpected', body: response.response.message || 'Unexpected error occurred.' }, 5000);
      }

    }, error => {
      error = error.error.response || error.error;

      switch (error.name) {
        case CODE_CONF.getCodeByName('USERNAME_MISMATCH').name: {
          this.username.setErrors({ 'no-match' : true }); break;
        }
        case CODE_CONF.getCodeByName('PASSWORD_MISMATCH').name: {
          this.password.setErrors({ 'no-match' : true }); break;
        }
        default: {
          this.alertsService.alertDanger({ title: error.name || error.status || 'Error', body: error.message || JSON.stringify(error) || 'Unidentified error' }, 5000);
          break;
        }
      }

    })
  }

}
