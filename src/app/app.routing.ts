import { NgModule } from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegistrationComponent} from './pages/registration/registration.component';
import {CredResetComponent} from './pages/cred-reset/cred-reset.component';
import { RegistrationRequestComponent } from './pages/registration/registration-request/registration-request.component';
import {RequestCredResetComponent} from './pages/cred-reset/request-cred-reset/request-cred-reset.component';
import {AuthGuard, PreventLogged} from './midpoint/auth/auth.guard';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AdminComponent} from './pages/admin/admin.component';
import {promise} from 'selenium-webdriver';
import fullyResolved = promise.fullyResolved;
import {SecMatchTileComponent} from './pages/dashboard/sections/sec-match-tile/sec-match-tile.component';

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
    path: 'request',
    children: [
      { path: '', redirectTo: 'registration', pathMatch: 'full' },
      { path: 'registration',  component: RegistrationRequestComponent },
      { path: 'registration/:hash', component: RegistrationComponent },
      { path: 'credentials-reset', component: RequestCredResetComponent },
      { path: 'password-reset/:hash', component: CredResetComponent }
    ]
  },
  {
    path: 'dashboard',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    redirectTo: 'admin',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting { }
