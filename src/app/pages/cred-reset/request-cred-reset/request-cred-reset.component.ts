import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../base/auth/auth.service';
import {AlertsService} from '../../../base/alerts/alerts.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import * as CODE_CONF from '../../../base/config/codes/codes.dev';
import {Title} from '@angular/platform-browser';
import {CredResetService} from '../cred-reset.service';

@Component({
  selector: 'ns-request-cred-reset',
  templateUrl: './request-cred-reset.component.html',
  styleUrls: ['./request-cred-reset.component.scss']
})
export class RequestCredResetComponent implements OnInit {

  public resetReqForm: FormGroup;
  public submitted = false;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private alertsService: AlertsService,
              private fb: FormBuilder,
              private router: Router,
              private titleService: Title,
              private credResetService: CredResetService) {

    this.resetReqForm = new FormGroup({
      type: new FormControl(null, [ Validators.required ]),
      username: new FormControl(null),
      email: new FormControl(null, [ Validators.email ])
    });

    this.titleService.setTitle('Support » Request Credential Reset');

  }

  get username() { return this.resetReqForm.get('username'); }
  get email() { return this.resetReqForm.get('email'); }
  get type() { return this.resetReqForm.get('type'); }

  ngOnInit() {
    this.type.setValue('password', { onlySelf: true });
  }

  onChange() {
    this.email.setErrors(null);
    this.username.setErrors(null);
  }

  onSubmit(input) {
    this.username.markAsTouched();
    this.email.markAsTouched();
    this.type.markAsTouched();
    if (this.resetReqForm.valid && (input.username || input.email)) {
      console.log(input);

      if (input.username === '') { input.username = false; }
      if (input.email === '') { input.email = false; }

      if (!this.submitted) {
        if (input.type === 'password') {
          this.requestPassword(input);
          this.submitted = true;
        } else if (input.type === 'username') {
          this.requestUsername(input);
          this.submitted = true;
        }
      }

    }

  }

  requestPassword(input) {
    this.credResetService.requestPasswordReset(input).subscribe(response => {

      if (response.response.success) {
         this.alertsService.alertSuccess({
           title: 'Success',
           body: 'A password reset link has been sent to your email.'
         }, 5000);
         this.router.navigate(['/login']); // TODO - navigate to custom page?
      } else {
        this.submitted = false;
        this.alertsService.alertDanger({
          title: response.response.name || 'Error',
          body: response.response.message || 'Unexpected error occurred.'
        }, 5000);
      }

    }, error => {

      error = !!error.error ? !!error.error.response ? error.error.response : error.error : error;
      this.submitted = false;

      switch (error.name) {

        case CODE_CONF.getCodeByName('RESET_REQUEST_ALREADY_MADE').name: {
          if (input.username) {
            this.username.setErrors({ 'req-dup' : true });
          } else {
            this.email.setErrors({ 'req-dup' : true });
          }
          break;
        }
        case CODE_CONF.getCodeByName('USER_NOT_FOUND').name: {
          if (input.username) {
            this.username.setErrors({ 'not-found' : true });
          } else {
            this.email.setErrors({ 'not-found' : true });
          }
          break;
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

  requestUsername(input) {
    this.credResetService.sendUsernameToEmail(input).subscribe(response => {

      console.log(response);

      if (response.response.success) {
        this.alertsService.alertSuccess({
          title: 'Email sent',
          body: 'We\'ve sent you an email with your username!'
        }, 2500);
        this.router.navigate(['/']); // TODO - redirect to some custom page
      } else {
        this.submitted = false;
        this.alertsService.alertDanger({
          title: response.response.name || 'Unexpected',
          body: response.response.message || 'Unexpected error occurred.'
        }, 5000);
      }

    }, error => {
      error = !!error.error ? !!error.error.response ? error.error.response : error.error : error;
      console.log(error);
      this.submitted = false;

      switch (error.name) {

        case CODE_CONF.getCodeByName('EMAIL_NOT_FOUND').name: {
          this.email.setErrors({ 'not-found' : true }); break;
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
