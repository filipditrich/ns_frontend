import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DataResolver, IsRequestHashValid } from './services/request-validator.guard';
import { CheckType } from '../core/enums/check.enum';
/**
 * Components
 */
import { RegistrationComponent } from './pages/registration/registration.component';
import { RegistrationRequestComponent } from './pages/registration/request/request.component';
import { ResetRequestComponent } from './pages/reset/request/request.component';
import { ResetComponent } from './pages/reset/reset.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'registration',
    pathMatch: 'full'
  },
  {
    path: 'registration/:hash',
    component: RegistrationComponent,
    canActivate: [IsRequestHashValid],
    resolve: { request: DataResolver },
    data: { checkType: CheckType.Registration }
  },
  {
    path: 'request-registration',
    component: RegistrationRequestComponent
  },
  {
    path: 'forgotten-credentials',
    component: ResetRequestComponent
  },
  {
    path: 'password-reset/:hash',
    component: ResetComponent,
    canActivate: [IsRequestHashValid],
    data: { checkType: CheckType.PasswordReset }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRouting { }
