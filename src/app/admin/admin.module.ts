import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './pages/base/base.component';
import { AdminRouting } from './admin.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRegistrationRequestsComponent } from './pages/registration-requests/registration-requests.component';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminUserManagementComponent } from './pages/user-management/user-management.component';
import { AdminEditUserComponent } from './pages/user-management/edit-user/edit-user.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {DataResolver, IsRequestHashValid} from '../auth/services/request-validator.guard';
import {AuthGuard, RoleGuard} from '../core/services/auth.guard';
import { AdminCreateUserComponent } from './pages/user-management/create-user/create-user.component';
import { MatchManagerComponent } from './pages/match-manager/match-manager.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRouting,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    SharedModule
  ],
  declarations: [AdminComponent, BaseComponent, AdminRegistrationRequestsComponent, AdminUserManagementComponent, AdminEditUserComponent, AdminCreateUserComponent, MatchManagerComponent],
  providers: [
    [IsRequestHashValid],
    [DataResolver],
    [AuthGuard],
    [RoleGuard]
  ]
})
export class AdminModule { }
