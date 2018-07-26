import { NgModule } from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegistrationComponent} from './pages/registration/registration.component';
import {CredResetComponent} from './pages/cred-reset/cred-reset.component';
import { RegistrationRequestComponent } from './pages/registration/registration-request/registration-request.component';
import {RequestCredResetComponent} from './pages/cred-reset/request-cred-reset/request-cred-reset.component';
import {AuthGuard, PreventLogged} from './base/auth/auth.guard';
import { AdminRegistrationRequestsComponent } from './pages/admin/registration-requests/registration-requests.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [PreventLogged]
  },
  {
    path: 'admin',
    component: AdminRegistrationRequestsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'request',
    children: [
      { path: '', redirectTo: 'registration', pathMatch: 'full' },
      { path: 'registration',  component: RegistrationRequestComponent },
      { path: 'registration/:hash', component: RegistrationComponent },
      { path: 'credentials-reset', component: RequestCredResetComponent },
      { path: 'password-reset/:hash', component: CredResetComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting { }
