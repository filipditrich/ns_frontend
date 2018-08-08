import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
/**
 * Module Specific Imports
 */
import { AuthComponent } from './auth.component';
import { AuthRouting } from './auth.routing';
import { DataResolver, IsRequestHashValid } from './services/request-validator.guard';
/**
 * Components
 */
import { RegistrationComponent } from './pages/registration/registration.component';
import { RegistrationRequestComponent } from './pages/registration/request/request.component';
import { ResetComponent } from './pages/reset/reset.component';
import { ResetRequestComponent } from './pages/reset/request/request.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRouting,
    ReactiveFormsModule
  ],
  declarations: [AuthComponent, RegistrationComponent, RegistrationRequestComponent, ResetComponent, ResetRequestComponent],
  providers: [
    [IsRequestHashValid],
    [DataResolver]
  ]
})
export class AuthModule { }
