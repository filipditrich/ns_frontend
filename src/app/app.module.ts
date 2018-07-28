import {BrowserModule, Title} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpHeadersInterceptor } from './base/helpers/http.interceptor';
import { RegistrationComponent } from './pages/registration/registration.component';
import { CredResetComponent } from './pages/cred-reset/cred-reset.component';
import {AppService} from './app.service';
import { AlertsComponent } from './base/alerts/alerts.component';
import {AlertsService} from './base/alerts/alerts.service';
import { RegistrationRequestComponent } from './pages/registration/registration-request/registration-request.component';
import { RequestCredResetComponent } from './pages/cred-reset/request-cred-reset/request-cred-reset.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard, DataResolver, IsRequestHashValid, PreventLogged, RoleGuard} from './base/auth/auth.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { OncreateDirective } from './base/directives/oncreate.directive';
import { DialogsComponent } from './base/dialogs/dialogs.component';
import {AdminRegistrationRequestsComponent} from './pages/admin/registration-requests/registration-requests.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ErrorHelper} from './base/helpers/error.helper';
import { PageHeaderComponent } from './base/components/page-header/page-header.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { SideBarComponent } from './base/components/side-bar/side-bar.component';

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
    OncreateDirective,
    DialogsComponent,
    AdminRegistrationRequestsComponent,
    PageHeaderComponent,
    AdminComponent,
    HomeComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ],
  providers: [
    AlertsService,
    AppService,
    HttpClient,
    ErrorHelper,
    Title,
    [AuthGuard],
    [PreventLogged],
    [IsRequestHashValid],
    [RoleGuard],
    DataResolver,
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
