import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../base/auth/auth.service';
import { AlertsService } from '../../base/alerts/alerts.service';
import { isUpperCase, passwordConfirmation, passwordStrength } from '../../base/helpers/validator.helper';
import * as CODE_CONF from '../../base/config/codes/codes.dev';
import {Title} from '@angular/platform-browser';
import {RegistrationService} from './registration.service';

@Component({
  selector: 'ns-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public hash: string;
  public request: any;
  public registrationForm: FormGroup;
  public submitted = false;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private alertsService: AlertsService,
              private fb: FormBuilder,
              private router: Router,
              private titleService: Title,
              private registrationService: RegistrationService,
              private route: ActivatedRoute) {

    // TODO - Validators import settings from server (minlength, maxlength etc...)
    this.registrationForm = new FormGroup({
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

  get username() { return this.registrationForm.get('username'); }
  get name() { return this.registrationForm.get('name'); }
  get team() { return this.registrationForm.get('team'); }
  get password() { return this.registrationForm.get('password'); }
  get passwordSubmit() { return this.registrationForm.get('passwordSubmit'); }

  ngOnInit() {
    this.request = this.route.snapshot.data.request;
    this.team.setValue('ns', { onlySelf: true });
  }

  onSubmit(input) {

    if (!this.registrationForm.valid) {
      this.username.markAsTouched();
      this.team.markAsTouched();
      this.password.markAsTouched();
      this.passwordSubmit.markAsTouched();
      this.name.markAsTouched();
    } else {
      if (!this.submitted) {
        this.callRegistrationSvc(input);
        this.submitted = true;
      }
    }


  }

  // TODO - interface
  callRegistrationSvc(input) {
    this.registrationService.sendRegistrationRequest(this.hash, input).subscribe(response => {
      this.submitted = false;

      if (response.response.success && response.user) {
        this.alertsService.alertSuccess({
          title: 'User Registered',
          body: 'You\'ve been successfully Registered! <a [routerLink]="[\'/login\']">Login here</a>'
        }, 7500);
        this.router.navigate(['/login']);
      } else {
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
        case CODE_CONF.getCodeByName('USERNAME_IN_USE').name: {
          this.username.setErrors({ 'in-use' : true }); break;
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
