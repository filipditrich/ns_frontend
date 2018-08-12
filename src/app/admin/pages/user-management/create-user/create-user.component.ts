import { Component, OnInit } from '@angular/core';
import {AdminUserManagementService} from '../user-management.service';
import {ErrorHelper} from '../../../../core/helpers/error.helper';
import {AlertsService} from '../../../../core/services/alerts/alerts.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {isEmail, isUpperCase, passwordConfirmation, passwordStrength} from '../../../../core/helpers/validators.helper';
import {UserRoles} from '../../../../core/enums/user.enum';
import {IUser} from '../../../../core/models/user.interface';
import {IRegistrationCredentials} from '../../../../core/models/credentials.interface';
import * as _cc from '../../../../core/config/codes.config';

@Component({
  selector: 'ns-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class AdminCreateUserComponent implements OnInit {

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
      ]),
      team: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required, passwordStrength()
      ]),
      passwordSubmit: new FormControl(null, [ Validators.required ]),
      sendEmail: new FormControl(null)
    }, passwordConfirmation());

  }

  get username() { return this.form.get('username'); }
  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get roles() { return this.form.get('roles'); }
  get team() { return this.form.get('team'); }
  get password() { return this.form.get('password'); }
  get passwordSubmit() { return this.form.get('passwordSubmit'); }
  get sendEmail() { return this.form.get('sendEmail'); }

  ngOnInit() {
    this.team.setValue('ns', { onlySelf: true });
  }

  onSubmit(input: IRegistrationCredentials) {
    if (!this.form.valid) {
      this.username.markAsTouched();
      this.name.markAsTouched();
      this.email.markAsTouched();
      this.roles.markAsTouched();
      this.team.markAsTouched();
      this.password.markAsTouched();
      this.passwordSubmit.markAsTouched();
    } else {
      console.log(input);
      const prepared = {
        username: input.username,
        password: input.password,
        name: input.name,
        email: input.email,
        roles: input.roles,
        team: input.team
      };
      const options = { mail: this.sendEmail.value };
      console.log(prepared);
      this.userMgmtSvc.createUser(prepared, options).subscribe(response => {

        if (response.response.success) {

          this.router.navigate(['/admin/user-management']).then(() => {
            this.alertsService.alertSuccess({
              title: 'Created',
              body: 'User has been successfully created.'
            }, 5000);
          }).catch(error => {
            this.errorHelper.handleGenericError(error);
          });

        } else {
          this.errorHelper.processedButFailed(response);
        }

      }, err => {

        const error = !!err.error ? !!err.error.response ? err.error.response : err.error : err;
        this.submitted = false;

        switch (error.name) {
          case _cc.getCodeByName('USERNAME_IN_USE').name: {
            this.username.setErrors({ 'in-use' : true }); break;
          }
          case _cc.getCodeByName('EMAIL_ALREADY_IN_USE').name: {
            this.email.setErrors({ 'in-use' : true }); break;
          }
          default: {
            this.errorHelper.handleGenericError(err);
            break;
          }
        }

      });
    }
  }

}
