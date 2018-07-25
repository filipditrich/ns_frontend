import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../midpoint/auth/auth.service';
import { AlertsService } from '../../../midpoint/alerts/alerts.service';

@Component({
  selector: 'ns-registration-request',
  templateUrl: './registration-request.component.html',
  styleUrls: ['./registration-request.component.scss']
})
export class RegistrationRequestComponent implements OnInit {

  public regReqForm: FormGroup;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private alertsService: AlertsService,
              private fb: FormBuilder,
              private router: Router) {

    this.regReqForm = fb.group({
      'name': [null, Validators.required],
      'email': [null, Validators.compose([ Validators.required, Validators.email ])]
    });

  }

  ngOnInit() {
  }

  onSubmit(input) {
    if (!this.regReqForm.valid) {
      this.regReqForm.controls['name'].markAsTouched();
      this.regReqForm.controls['email'].markAsTouched();
    } else {
      this.authService.requestRegistration(input).subscribe(response => {
        if (response.response.success) {
          this.alertsService.alertSuccess({ title: response.response.name || 'Success', body: response.response.message || 'Sent' }, 2500);
        } else {
          this.alertsService.alertDanger({ title: response.response.name || 'Error', body: response.response.message || response.response }, 5000);
        }

      }, error => {
        error = error.error.response || error;
        this.alertsService.alertDanger({ title: error.name || 'Error', body: error.message || error }, 5000);
      });
    }

  }

}
