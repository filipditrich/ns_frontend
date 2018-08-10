import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BaseComponent } from './pages/base/base.component';
import { AdminRegistrationRequestsComponent } from './pages/registration-requests/registration-requests.component';
import { AdminComponent } from './admin.component';
import { AdminUserManagementComponent } from './pages/user-management/user-management.component';
import {AdminEditUserComponent} from './pages/user-management/edit-user/edit-user.component';
import {DataResolver, IsRequestHashValid} from '../auth/services/request-validator.guard';
import {CheckType} from '../core/enums/check.enum';
import {AuthGuard, RoleGuard} from '../core/services/auth.guard';
import {UserRoles} from '../core/enums/user.enum';
import {AdminCreateUserComponent} from './pages/user-management/create-user/create-user.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'user-management', pathMatch: 'full' },
      { path: 'registration-requests', component: AdminRegistrationRequestsComponent },
      { path: 'user-management',
        children: [
          { path: '', component: AdminUserManagementComponent },
          { path: 'edit-user/:hash',
            component: AdminEditUserComponent,
            canActivate: [IsRequestHashValid],
            resolve: { request: DataResolver },
            data: { checkType: CheckType.EditUser }
          },
          { path: 'create-user', component: AdminCreateUserComponent }
        ]
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouting { }
