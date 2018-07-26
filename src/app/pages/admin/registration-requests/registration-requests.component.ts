import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {getUrl} from '../../../base/helpers/endpoint.helper';
import {DialogsService} from '../../../base/dialogs/dialogs.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../base/auth/auth.service';
import {AlertsService} from '../../../base/alerts/alerts.service';
import {isEmail} from '../../../base/helpers/validator.helper';

@Component({
  selector: 'ns-registration-requests',
  templateUrl: './registration-requests.component.html',
  styleUrls: ['./registration-requests.component.scss']
})
export class AdminRegistrationRequestsComponent implements OnInit {

  public rows = [];
  public temp = [];
  public columns = [
    { name: 'Email' },
    { name: 'Name' },
    { name: 'Requested On', prop: 'requestedOn' },
    { name: 'Approved', prop: 'approval.approved' },
    { name: 'Registered', prop: 'registration.userRegistered' }
  ];
  public oneEmailOpen = false;
  public moreEmailOpen = false;

  public inviteOneForm: FormGroup;
  public inviteMoreForm: FormGroup;
  public invitationEmails = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private http: HttpClient,
              private dialogService: DialogsService,
              private authService: AuthService,
              private alertsService: AlertsService) {
    this.http.get<any>(getUrl('LIST_REQS')).subscribe(response => {
      console.log(response);

      if (response.requests) {
        this.rows = response.requests;
        this.temp = [...response.requests];
      }

    }, error => {
      console.log(error);
    });


    this.inviteOneForm = new FormGroup({
      email: new FormControl(null,  [ isEmail(), Validators.required ])
    });

    this.inviteMoreForm = new FormGroup({
      email: new FormControl(null, [ isEmail(), Validators.required ])
    });

  }

  get oneEmail() { return this.inviteOneForm.get('email'); }
  get moreEmail() { return this.inviteMoreForm.get('email'); }

  ngOnInit() {
  }

  closeMoreEmail() {
    if (this.invitationEmails.length !== 0) {
      this.dialogService.dialogDanger({
        title: 'Discard changes?',
        body: '<span>Do you really want to close this form and clear inputted email(s)?</span>',
        buttons: [
          { class: 'btn-danger', text: 'Yes', action: () => { this.invitationEmails = []; this.moreEmailOpen = false; this.inviteMoreForm.reset(); this.dialogService.clearDialogs(); } },
          { class: 'btn-cancel', text: 'No', action: 'close' }
        ]
      });
    } else {
      this.moreEmailOpen = false;
      this.inviteMoreForm.reset();
    }
  }

  addEvite(email) {
    if (!this.inviteMoreForm.valid) {
      this.moreEmail.markAsTouched();
    } else {
      if (this.invitationEmails.indexOf(email) >= 0) {
        this.moreEmail.setErrors({ 'duplicate' : true });
      } else {
        this.invitationEmails.push(email);
        this.moreEmail.setValue(null);
      }
    }
  }

  sendEvite(email) {
    if (!this.inviteOneForm.valid) {
      this.oneEmail.markAsTouched();
    } else {
      this.sendEmailInvitations(email);
    }
  }

  sendEvites(emails) {
    if (this.invitationEmails.length === 0) {
      this.moreEmail.markAsTouched();
    } else {
      this.sendEmailInvitations(emails);
    }
  }

  sendEmailInvitations(emails) {
    emails = { emails: emails };
    this.moreEmailOpen = false; this.oneEmailOpen = false;
    this.inviteMoreForm.reset(); this.inviteOneForm.reset();
    this.dialogService.clearDialogs(); this.invitationEmails = [];
    this.authService.sendInvitations(emails).subscribe(response => {

      console.log(response);

      if (response.response.success && response.sent.length !== 0) {
        const total = Array.isArray(emails.emails) ? emails.emails.length : 1;
        this.alertsService.alertSuccess({
          title: 'Invitations sent!',
          body: `We have successfully sent ${response.sent.length} out of ${total} invitation emails.`
        }, 5000);
      } else if (response.response.success && response.sent.length === 0 && response.unsent.length !== 0) {
        this.alertsService.alertDanger({
          title: 'Error sending invitations',
          body: `We weren't able to send a single invitation email. Please make sure the invitation email is valid and is not already in invitation list.<br><b>Failure emails:</b> ${response.unsent.join(', ')}.`
        }, 7500);
      } else {
        this.alertsService.alertDanger({
          title: response.response.name || 'Error',
          body: response.response.status || 'Couldn\'t process'
        }, 5000);
      }

    }, error => {
      error = error.error.response || error.error;

      console.log(error);
    });
  }

  removeInvEmail(email) {
    this.invitationEmails = this.invitationEmails.filter(x => x !== email);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
