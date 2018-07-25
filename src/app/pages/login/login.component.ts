import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AlertsService} from '../../midpoint/alerts/alerts.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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

    this.loginForm = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });

  }

  ngOnInit() {

  }

  onSubmit(input) {

    if (!input.username || !input.password) {
      this.loginForm.controls['username'].markAsTouched();
      this.loginForm.controls['password'].markAsTouched();
    }

    if (!this.loginForm.valid) { /* TODO - trigger wiggle animation ? */ } else {
      this.authService.logIn(input).subscribe(response => {

        if (response.response.success && response.token) {
          this.authService.storeUserData(response.user, response.token);
          this.alertsService.alertSuccess({title: 'Logged In', body: 'You\'ve been successfully logged in!'}, 2500);
          this.router.navigate(['/dashboard']);
        } else {
          this.alertsService.alertDanger({title: 'Unexpected Error', body: 'An unexpected error occurred: 0x00E'}, 5000);
        }

      }, error => {
        error = error.error.response || error.error;

        switch (error.name) {
          case CODE_CONF.getCodeByName('USERNAME_MISMATCH').name: {
            this.loginForm.controls['username'].setErrors({'no-match': 'true'}); break;
          }
          case CODE_CONF.getCodeByName('PASSWORD_MISMATCH').name: {
            this.loginForm.controls['password'].setErrors({'no-match': 'true'}); break;
          }
          default: {
            this.alertsService.alertDanger({title: 'Unexpected Error', body: 'An unexpected error occurred: 0x00F'}, 5000); break;
          }
        }

      });
    }

  }

}
