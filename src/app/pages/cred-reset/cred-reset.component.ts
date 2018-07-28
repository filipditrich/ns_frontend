import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../base/auth/auth.service';
import {AlertsService} from '../../base/alerts/alerts.service';
import {passwordConfirmation, passwordStrength} from '../../base/helpers/validator.helper';
import * as CODE_CONF from '../../base/config/codes/codes.dev';
import {Title} from '@angular/platform-browser';
import {CredResetService} from './cred-reset.service';

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
              private router: Router,
              private titleService: Title,
              private credResetService: CredResetService,
              private route: ActivatedRoute) {

    this.newPasswordForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required, passwordStrength()
      ]),
      passwordSubmit: new FormControl(null, [ Validators.required ])
    }, passwordConfirmation());

    this.titleService.setTitle('Support » Password Reset');
    this.hash = this.route.snapshot.paramMap.get('hash');
  }

  get password() { return this.newPasswordForm.get('password'); }
  get passwordSubmit() { return this.newPasswordForm.get('passwordSubmit'); }

  ngOnInit() {
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

    this.credResetService.createNewPassword(this.hash, input).subscribe(response => {

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
      error = !!error.error ? !!error.error.response ? error.error.response : error.error : error;
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
