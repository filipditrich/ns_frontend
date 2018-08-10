import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {AdminUserManagementService} from './user-management.service';
import {ErrorHelper} from '../../../core/helpers/error.helper';
import * as moment from 'moment';
import {DialogsService} from '../../../core/services/dialogs/dialogs.service';
import {AlertsService} from '../../../core/services/alerts/alerts.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'ns-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class AdminUserManagementComponent implements OnInit {

  public mobile: boolean;
  public rows: any[] = [];
  public temp = [];
  public form: FormGroup;

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

    this.form = new FormGroup({
      filterBy: new FormControl(null),
      search: new FormControl(null)
    });

  }

  get filterBy() { return this.form.get('filterBy'); }
  get search() { return this.form.get('search'); }

  ngOnInit() {
    this.mobile = window.innerWidth <= 768;
    this.filterBy.setValue('email', { onlySelf: true });
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
          action: () => this.removeUser(id)
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
        this.loadUsers();
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
    // this.loadUsers();
  }

  onPage(event) {
    this.loadUsers();
  }

  rowClass(row) {
    return {
      'muted' : !!row
    };
  }

  updateFilter() {
    const val = this.search.value;
    const filterBy = this.filterBy.value || 'email';
    this.rows = this.temp.filter(function(d) {
      return d[filterBy].toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.table.offset = 0;
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

}
