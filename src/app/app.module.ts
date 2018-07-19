import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpHeadersInterceptor } from './crux/helpers/http.interceptor';
import { RegistrationComponent } from './pages/registration/registration.component';
import { CredResetComponent } from './pages/cred-reset/cred-reset.component';
import { RequestComponent } from './pages/registration/request/request.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    CredResetComponent,
    RequestComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true
    },
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
