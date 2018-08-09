import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminUserManagementService } from '../user-management.service';
import { ErrorHelper } from '../../../../core/helpers/error.helper';
import { IUser } from '../../../../core/models/user.interface';
import { UserRoles } from '../../../../core/enums/user.enum';
import { isEmail, isUpperCase } from '../../../../core/helpers/validators.helper';
import {AlertsService} from '../../../../core/services/alerts/alerts.service';
import {isSame} from '../../../../core/helpers/functions.helper';

@Component({
  selector: 'ns-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class AdminEditUserComponent implements OnInit {

  public form: FormGroup;
  public authRoles = UserRoles.values();
  public user: IUser;
  public userOriginal: IUser;

  constructor(private userMgmtSvc: AdminUserManagementService,
              private errorHelper: ErrorHelper,
              private alertsService: AlertsService) {

    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required, Validators.minLength(5), Validators.maxLength(32), isUpperCase()
      ]),
      name: new FormControl(null, [
        Validators.required, Validators.minLength(5)
      ]),
      email: new FormControl(null, [
        Validators.required, isEmail()
      ]),
      roles: new FormControl(null, [
        Validators.required
      ])
    });

  }

  get username() { return this.form.get('username'); }
  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get roles() { return this.form.get('roles'); }

  ngOnInit() {
    this.userMgmtSvc.getUser('5b6ac9b682aaec0913b71f36').subscribe(response => {
      this.user = response.output[0];
      this.userOriginal = this.user;
      this.roles.setValue(this.user.roles);
      this.email.setValue(this.user.email || 'n/a');
      this.name.setValue(this.user.name || 'n/a');
      this.username.setValue(this.user.username || 'n/a');
    }, error => {
      this.errorHelper.handleGenericError(error);
    });
  }

  onSubmit(values) {
    console.log(values, this.user);
    if (!this.form.valid) {
      this.name.markAsTouched();
      this.username.markAsTouched();
      this.email.markAsTouched();
      this.roles.markAsTouched();
    } else {
      this.alertsService.alertSuccess({
        title: 'Saved',
        body: 'Changes to user successfully saved.'
      }, 5000);
    }
  }

  isChanged() {
    // TODO - find a better way of performing this check
    if (!!this.user) {
      return (this.username.value !== this.user.username ||
        this.name.value !== this.user.name ||
        !isSame(this.roles.value, this.user.roles) ||
        this.email.value !== this.user.email);
    } else {
      return false;
    }
  }

}
