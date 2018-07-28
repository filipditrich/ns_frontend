import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../../base/auth/auth.service';
import { AlertsService } from '../../../base/alerts/alerts.service';
import * as CODE_CONF from '../../../base/config/codes/codes.dev';
import {Title} from '@angular/platform-browser';
import {RegistrationService} from '../registration.service';

@Component({
  selector: 'ns-registration-request',
  templateUrl: './registration-request.component.html',
  styleUrls: ['./registration-request.component.scss']
})
export class RegistrationRequestComponent implements OnInit {

  public regReqForm: FormGroup;
  public submitted = false;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private alertsService: AlertsService,
              private fb: FormBuilder,
              private router: Router,
              private titleService: Title,
              private registrationService: RegistrationService) {

    this.regReqForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required, Validators.minLength(5)
      ]),
      email: new FormControl(null, [
        Validators.required, Validators.email
      ])
    });

    this.titleService.setTitle('Northern Stars » Registration Request');

  }

  get name() { return this.regReqForm.get('name'); }
  get email() { return this.regReqForm.get('email'); }

  ngOnInit() {
  }

  onSubmit(input) {
    if (!this.regReqForm.valid) {
      this.name.markAsTouched();
      this.email.markAsTouched();
    } else {
      if (!this.submitted) {
        this.makeRequest(input);
        this.submitted = true;
      }
    }

  }

  // TODO - interface
  makeRequest(input) {
    this.registrationService.requestRegistration(input).subscribe(response => {
      if (response.response.success) {
        this.alertsService.alertSuccess({ title: response.response.name || 'Success', body: response.response.message || 'Sent' }, 7500);
        this.router.navigate(['/login']); // TODO - page with you username is waiting to be accepted blah blah blah...
      } else {
        this.submitted = false;
        this.alertsService.alertDanger({
          title: response.response.name || 'Error',
          body: response.response.message || response.response
        }, 5000);
      }

    }, error => {
      error = !!error.error ? !!error.error.response ? error.error.response : error.error : error;
      this.submitted = false;

      switch (error.name) {
        case CODE_CONF.getCodeByName('REQUEST_WITH_EMAIL_ALREADY_MADE').name: {
          this.email.setErrors({ 'in-use' : true }); break;
        }
        case CODE_CONF.getCodeByName('EMAIL_ALREADY_IN_USE').name: {
          this.email.setErrors({ 'in-use' : true }); break;
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
