import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpHeadersInterceptor } from './midpoint/helpers/http.interceptor';
import { RegistrationComponent } from './pages/registration/registration.component';
import { CredResetComponent } from './pages/cred-reset/cred-reset.component';
import { RequestComponent } from './pages/registration/request/request.component';
import {AppService} from './app.service';

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
    AppService,
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (appService: AppService) => () => appService.obtainCodes(),
      deps: [AppService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
