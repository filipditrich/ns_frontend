import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../base/auth/auth.service';
import {AlertsService} from '../../base/alerts/alerts.service';
import {passwordConfirmation, passwordStrength} from '../../base/helpers/validator.helper';
import * as CODE_CONF from '../../base/config/codes/codes.dev';

@Component({
  selector: 'ns-cred-reset',
  templateUrl: './cred-reset.component.html',
  styleUrls: ['./cred-reset.component.scss']
})
export class CredResetComponent implements OnInit {

  public newPasswordForm: FormGroup;
  public submitted = false;
  public hash: string;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private alertsService: AlertsService,
              private fb: FormBuilder,
              private router: Router) {

    this.newPasswordForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required, passwordStrength()
      ]),
      passwordSubmit: new FormControl(null, [ Validators.required ])
    }, passwordConfirmation());

  }

  get password() { return this.newPasswordForm.get('password'); }
  get passwordSubmit() { return this.newPasswordForm.get('passwordSubmit'); }

  ngOnInit() {
    // Check if the request hash is valid // TODO - transform this into AuthGuard
    this.hash = this.router.url.split('/')[this.router.url.split('/').length - 1];
    this.authService.checkPasswordResetRequest(this.hash).subscribe(result => {
      if (result.response.success) {
      } else {
        this.router.navigate(['/request/registration']);
      }
    }, error => {
      this.router.navigate(['/request/registration']);
    });
  }

  onSubmit(input) {
    if (!this.newPasswordForm.valid) {
      this.password.markAsTouched();
      this.passwordSubmit.markAsTouched();
    } else {
      if (!this.submitted) {
        this.callPasswordResetSvc(input);
        this.submitted = true;
      }
    }
  }

  callPasswordResetSvc(input) {

    this.authService.createNewPassword(this.hash, input).subscribe(response => {

      if (response.response.success) {
        this.alertsService.alertSuccess({
          title: 'Password changed!',
          body: 'Your password has been successfully changed. You can now login with your new password!'
        }, 7500);
        this.router.navigate(['/login']);
      } else {
        // unsuccessful
        this.submitted = false;
        this.alertsService.alertDanger({
          title: response.response.name || 'Error',
          body: response.response.status || 'Couldn\'t process'
        }, 5000);
      }

    }, error => {
      error = error.error.response || error.error;
      this.submitted = false;

      switch (error.name) {
        case CODE_CONF.getCodeByName('NEW_PASSWORD_IS_OLD').name: {
          this.password.setErrors({ 'new-is-old' : true }); break;
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
