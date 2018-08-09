import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {AdminUserManagementService} from './user-management.service';
import {ErrorHelper} from '../../../core/helpers/error.helper';
import * as moment from 'moment';
import {DialogsService} from '../../../core/services/dialogs/dialogs.service';
import {AlertsService} from '../../../core/services/alerts/alerts.service';

@Component({
  selector: 'ns-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class AdminUserManagementComponent implements OnInit {

  public mobile: boolean;
  public rows: any[] = [];
  public temp = [];

  @ViewChild('myTable') table: any;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.mobile = event.target.innerWidth <= 768;
  }

  constructor(private userMgmntSvc: AdminUserManagementService,
              private errorHelper: ErrorHelper,
              private dialogsService: DialogsService,
              private alertsService: AlertsService) {

    this.loadUsers();

  }

  ngOnInit() {
    this.mobile = window.innerWidth <= 768;
  }

  deleteUser(id) {
    this.dialogsService.dialogDanger({
      title: 'Are you sure?',
      body: 'Do you really want to delete this user?',
      buttons: [
        {
          class: 'btn-cancel',
          text: 'Cancel',
          action: 'close'
        },
        {
          class: 'btn-danger',
          text: 'Delete',
          action: () => { this.removeUser(id); this.loadUsers(); }
        }
      ]
    });
  }

  removeUser(id) {
    this.userMgmntSvc.deleteUser(id).subscribe(response => {
      if (response.response.success) {
        this.alertsService.alertSuccess({
          title: 'Deleted',
          body: 'User successfully deleted.'
        }, 5000);
      } else {
        this.errorHelper.processedButFailed(response);
      }
    }, error => {
      this.errorHelper.handleGenericError(error);
    });
  }

  loadUsers() {
    this.userMgmntSvc.listUsers().subscribe(response => {
      if (response.output) {
        this.rows = response.output;
        this.temp = [...response.output];
      } else {
        this.errorHelper.processedButFailed(response);
      }

    }, error => {
      this.errorHelper.handleGenericError(error);
    });
  }

  onSort(event) {
    this.loadUsers();
  }

  onPage(event) {
    this.loadUsers();
  }

  rowClass(row) {
    return {
      'muted' : !!row
    };
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
