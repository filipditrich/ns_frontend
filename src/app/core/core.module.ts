import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CoreRouting } from './core.routing';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpHeadersInterceptor } from './services/http.interceptor';
import { PreloadInitializer } from './services/preload.initializer';
import { AlertsService } from './services/alerts/alerts.service';
import { AlertsComponent } from './services/alerts/alerts.component';
import { DialogsComponent } from './services/dialogs/dialogs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogsService } from './services/dialogs/dialogs.service';
import { AuthGuard, PreventLogged, RoleGuard } from './services/auth.guard';
import { PreviousRouteService } from './services/previous-route.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LogoutComponent } from './pages/logout/logout.component';

export function PreloadInitializerProviderFactory(provider: PreloadInitializer) {
  return () => provider.startupConfig();
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreRouting
  ],
  exports: [
    RouterModule,
    AlertsComponent,
    DialogsComponent,
    FormsModule
  ],
  declarations: [LoginComponent, AlertsComponent, DialogsComponent, NotFoundComponent, LogoutComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true },
    { provide: APP_INITIALIZER,
      useFactory: PreloadInitializerProviderFactory,
      deps: [PreloadInitializer],
      multi: true },

    AlertsService,
    DialogsService,
    PreviousRouteService,

    [PreventLogged],
    [AuthGuard],
    [RoleGuard]
  ]
})
export class CoreModule { }
