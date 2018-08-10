import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminUserManagementService } from '../user-management.service';
import { ErrorHelper } from '../../../../core/helpers/error.helper';
import { IUser } from '../../../../core/models/user.interface';
import { UserRoles } from '../../../../core/enums/user.enum';
import { isEmail, isUpperCase } from '../../../../core/helpers/validators.helper';
import {AlertsService} from '../../../../core/services/alerts/alerts.service';
import {isSame} from '../../../../core/helpers/functions.helper';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ns-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class AdminEditUserComponent implements OnInit {

  public form: FormGroup;
  public authRoles = UserRoles.values();
  public user: IUser;
  public hash: string;
  public submitted = false;

  constructor(private userMgmtSvc: AdminUserManagementService,
              private errorHelper: ErrorHelper,
              private alertsService: AlertsService,
              private route: ActivatedRoute,
              private router: Router) {

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
    this.user = this.route.snapshot.data.request;
    this.hash = this.route.snapshot.paramMap.get('hash');
    this.roles.setValue(this.user.roles);
    this.email.setValue(this.user.email || 'n/a');
    this.name.setValue(this.user.name || 'n/a');
    this.username.setValue(this.user.username || 'n/a');
  }

  onSubmit(input) {
    if (!this.form.valid) {
      this.name.markAsTouched();
      this.username.markAsTouched();
      this.email.markAsTouched();
      this.roles.markAsTouched();
    } else {
      this.submitted = true;
      this.userMgmtSvc.updateUser(this.hash, input).subscribe(response => {
        if (response.response.success) {
          this.router.navigate([this.router.url]).then(() => {
            this.alertsService.alertSuccess({
              title: 'Saved',
              body: 'Changes successfully saved.'
            }, 5000);
          }).catch(error => {
            this.errorHelper.handleGenericError(error);
          });
        } else {
          this.errorHelper.processedButFailed(response);
        }
        this.submitted = false;
      }, error => {
        this.errorHelper.handleGenericError(error);
        this.submitted = false;
      });
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
