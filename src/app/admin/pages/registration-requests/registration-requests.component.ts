import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogsService } from '../../../core/services/dialogs/dialogs.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AlertsService } from '../../../core/services/alerts/alerts.service';
import { isEmail } from '../../../core/helpers/validators.helper';
import { ErrorHelper } from '../../../core/helpers/error.helper';
import { RegistrationRequestsService } from './registration-requests.service';

import * as moment from 'moment';

@Component({
  selector: 'ns-registration-requests',
  templateUrl: './registration-requests.component.html',
  styleUrls: ['./registration-requests.component.scss']
})
export class AdminRegistrationRequestsComponent implements OnInit {

  public temp = [];
  public rows: any[] = [];
  public expanded: any = {};
  public timeout: any;
  public mobile = false;

  // TODO - make dynamic?
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

  @ViewChild('myTable') table: any;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.mobile = event.target.innerWidth <= 768;
  }

  constructor(private http: HttpClient,
              private dialogService: DialogsService,
              private authService: AuthService,
              private alertsService: AlertsService,
              private errorHelper: ErrorHelper,
              private adminRegReqSvc: RegistrationRequestsService) {

    this.loadRequests();

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
    this.mobile = window.innerWidth <= 768;
  }


  closeMoreEmail() {
    if (this.invitationEmails.length !== 0) {
      this.dialogService.dialogDanger({
        title: 'Discard changes?',
        body: '<span>Do you really want to close this form and clear inputted email(s)?</span>',
        buttons: [
          { class: 'btn-danger', text: 'Yes', action: () => {
              this.invitationEmails = [];
              this.moreEmailOpen = false;
              this.inviteMoreForm.reset();
              this.dialogService.clearDialogs();
            }},
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

  removeInvEmail(email) {
    this.invitationEmails = this.invitationEmails.filter(x => x !== email);
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

    this.adminRegReqSvc.sendInvitations(emails).subscribe(response => {

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
        this.errorHelper.processedButFailed(response);
      }

    }, error => {

      // optional error handling
      // ...

      // then generic (if no handle before)
      this.errorHelper.handleGenericError(error);

    });
  }

  approveRequest(hash) {
    this.adminRegReqSvc.approveRequest(hash).subscribe(response => {

      if (response.response.success) {
        this.alertsService.alertSuccess({
          title: 'Request Approved',
          body: 'Request has been approved and the user can now register'
        }, 7500);
        this.loadRequests();
      } else {
        this.errorHelper.processedButFailed(response);
      }

    }, error => {
      this.errorHelper.handleGenericError(error);
    });
  }

  onSort(event) {
    this.loadRequests();
  }

  onPage(event) {
    this.loadRequests();
  }

  rowClass(row) {
    return {
      'muted' : row.approval.approved
    };
  }

  loadRequests() {
    this.adminRegReqSvc.listRequests().subscribe(response => {

      if (response.requests) {
        this.rows = response.requests;
        this.rows.forEach(row => {
          row.requestedOn = moment(row.requestedOn).format('lll');
        });
        this.temp = [...response.requests];
      } else {
        this.errorHelper.processedButFailed(response);
      }

    }, error => {
      this.errorHelper.handleGenericError(error);
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    this.rows = this.temp.filter(function(d) {
      return d.email.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.table.offset = 0;
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

}
