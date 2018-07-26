import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpHeadersInterceptor } from './midpoint/helpers/http.interceptor';
import { RegistrationComponent } from './pages/registration/registration.component';
import { CredResetComponent } from './pages/cred-reset/cred-reset.component';
import {AppService} from './app.service';
import { AlertsComponent } from './midpoint/alerts/alerts.component';
import {AlertsService} from './midpoint/alerts/alerts.service';
import { RegistrationRequestComponent } from './pages/registration/registration-request/registration-request.component';
import { RequestCredResetComponent } from './pages/cred-reset/request-cred-reset/request-cred-reset.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard, PreventLogged} from './midpoint/auth/auth.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {DashboardModule} from './pages/dashboard/dashboard.module';
import { AdminComponent } from './pages/admin/admin.component';
import {AdminModule} from './pages/admin/admin.module';

export function AppServiceProviderFactory(provider: AppService) {
  return () => provider.startupConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    CredResetComponent,
    AlertsComponent,
    RegistrationRequestComponent,
    RequestCredResetComponent,
    DashboardComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    AdminModule
  ],
  providers: [
    AlertsService,
    AppService,
    HttpClient,
    [AuthGuard],
    [PreventLogged],
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: AppServiceProviderFactory,
      deps: [AppService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
