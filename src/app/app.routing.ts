import { NgModule } from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegistrationComponent} from './pages/registration/registration.component';
import {CredResetComponent} from './pages/cred-reset/cred-reset.component';
import { RegistrationRequestComponent } from './pages/registration/registration-request/registration-request.component';
import {RequestCredResetComponent} from './pages/cred-reset/request-cred-reset/request-cred-reset.component';
import {AuthGuard, DataResolver, IsRequestHashValid, PreventLogged, RoleGuard} from './base/auth/auth.guard';
import { AdminRegistrationRequestsComponent } from './pages/admin/registration-requests/registration-requests.component';
import {checkType} from './base/enums';
import {AdminComponent} from './pages/admin/admin.component';
import {IUserRoles} from './base/models/credentials.interface';
import {HomeComponent} from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [PreventLogged]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [ IUserRoles.admin ] },
    children: [
      { path: '', component: AdminComponent },
      { path: 'registration-requests',  component: AdminRegistrationRequestsComponent }
    ]
  },
  {
    path: 'request',
    canActivate: [PreventLogged],
    children: [
      { path: '', redirectTo: 'registration', pathMatch: 'full' },
      { path: 'registration',  component: RegistrationRequestComponent },
      { path: 'registration/:hash',
        component: RegistrationComponent,
        canActivate: [IsRequestHashValid],
        data: { checkType: checkType.Registration },
        resolve: { request: DataResolver }
      },
      { path: 'credentials-reset', component: RequestCredResetComponent },
      { path: 'password-reset/:hash',
        component: CredResetComponent,
        canActivate: [IsRequestHashValid],
        data: { checkType: checkType.PasswordReset }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting { }
