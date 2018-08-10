import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AlertsService } from '../../../core/services/alerts/alerts.service';
import { isUpperCase, passwordStrength, passwordConfirmation } from '../../../core/helpers/validators.helper';
import { RegistrationService } from './registration.service';
import { ErrorHelper } from '../../../core/helpers/error.helper';
import { IRegistrationCredentials } from '../../../core/models/credentials.interface';

import * as _cc from '../../../core/config/codes.config';

@Component({
  selector: 'ns-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public hash: string;
  public request: any;
  public form: FormGroup;
  public submitted = false;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private alertsService: AlertsService,
              private fb: FormBuilder,
              private router: Router,
              private titleService: Title,
              private registrationService: RegistrationService,
              private route: ActivatedRoute,
              private errorHelper: ErrorHelper) {

    // TODO - Validators import settings from server (minlength, maxlength etc...)
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required, Validators.minLength(5), Validators.maxLength(32), isUpperCase()
      ]),
      name: new FormControl(null, [
        Validators.required, Validators.minLength(5)
      ]),
      team: new FormControl(),
      password: new FormControl(null, [
        Validators.required, passwordStrength()
      ]),
      passwordSubmit: new FormControl(null, [ Validators.required ])
    }, passwordConfirmation());

    this.titleService.setTitle('Northern Stars » Registration');

  }

  get username() { return this.form.get('username'); }
  get name() { return this.form.get('name'); }
  get team() { return this.form.get('team'); }
  get password() { return this.form.get('password'); }
  get passwordSubmit() { return this.form.get('passwordSubmit'); }

  ngOnInit() {
    this.request = this.route.snapshot.data.request;
    this.hash = this.route.snapshot.paramMap.get('hash');
    this.team.setValue('ns', { onlySelf: true });
    if (this.request.name) { this.name.setValue(this.request.name); }
  }

  onSubmit(input) {

    if (!this.form.valid) {
      this.username.markAsTouched();
      this.team.markAsTouched();
      this.password.markAsTouched();
      this.passwordSubmit.markAsTouched();
      this.name.markAsTouched();
    } else {
      if (!this.submitted) {
        this.submitted = true;
        this.callRegistrationSvc(input);
      }
    }


  }

  callRegistrationSvc(input: IRegistrationCredentials) {
    this.registrationService.registerUser(this.hash, input).subscribe(response => {
      this.submitted = false;

      if (response.response.success && response.user) {
        this.router.navigate(['/login']).then(() => {
          this.alertsService.alertSuccess({
            title: 'User Registered',
            body: 'You\'ve been successfully Registered! <a [routerLink]="[\'/login\']">Login here</a>'
          }, 7500);
        }).catch(error => {
          this.errorHelper.handleGenericError(error);
        });
      } else {
        this.submitted = false;
        this.errorHelper.processedButFailed(response);
      }

    }, err => {
      const error = !!err.error ? !!err.error.response ? err.error.response : err.error : err;
      this.submitted = false;

      switch (error.name) {
        case _cc.getCodeByName('USERNAME_IN_USE').name: {
          this.username.setErrors({ 'in-use' : true }); break;
        }
        default: {
          this.errorHelper.handleGenericError(err);
          break;
        }
      }

    });
  }

}
