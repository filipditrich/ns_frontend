import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../midpoint/auth/auth.service';
import {AlertsService} from '../../../midpoint/alerts/alerts.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import * as CODE_CONF from '../../../midpoint/config/codes/codes.dev';

@Component({
  selector: 'ns-request-cred-reset',
  templateUrl: './request-cred-reset.component.html',
  styleUrls: ['./request-cred-reset.component.scss']
})
export class RequestCredResetComponent implements OnInit {

  resetReqForm: FormGroup;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private alertsService: AlertsService,
              private fb: FormBuilder,
              private router: Router) {

    this.resetReqForm = new FormGroup({
      type: new FormControl(null, [ Validators.required ]),
      username: new FormControl(null),
      email: new FormControl(null, [ Validators.email ])
    });

  }

  get username() { return this.resetReqForm.get('username'); }
  get email() { return this.resetReqForm.get('email'); }
  get type() { return this.resetReqForm.get('type'); }

  ngOnInit() {
    this.type.setValue('password', { onlySelf: true })
  }

  onSubmit(input) {
    this.username.markAsTouched();
    this.email.markAsTouched();
    this.type.markAsTouched();
    if (this.resetReqForm.valid && (input.username || input.email)) {
      console.log(input);

      if (input.username === '') { input.username = false; }
      if (input.email === '') { input.email = false; }

      if (input.type === 'password') {
        this.requestPassword(input);
      } else if (input.type === 'username') {

      }

    }

  }

  requestPassword(input) {
    this.authService.requestPasswordReset(input).subscribe(response => {

      if (response.response.success) {
         this.alertsService.alertSuccess({ title: 'Success', body: 'A password reset link has been sent to your email.' }, 5000);
         this.router.navigate(['/login']); // TODO - navigate to custom page?
      } else {
        this.alertsService.alertDanger({ title: response.response.name || 'Error', body: response.response.message || 'Unexpected error occurred.' }, 5000);
      }

    }, error => {

      error = error.error.response || error.error;

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
          this.alertsService.alertDanger({ title: error.name || error.status || 'Error', body: error.message || JSON.stringify(error) || 'Unidentified error' }, 5000);
          break;
        }

      }

    });
  }

  requestUsername(input) {

  }

}
