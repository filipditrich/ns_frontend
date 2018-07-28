import {ActivatedRouteSnapshot, CanActivate, Resolve, Route, Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { RegistrationService } from '../../pages/registration/registration.service';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { CredResetService } from '../../pages/cred-reset/cred-reset.service';
import { checkType } from '../enums';
import {AlertsService} from '../alerts/alerts.service';
import {ErrorHelper} from '../helpers/error.helper';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authService.isTokenValid()) {
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { return: state.url } });
      return false;
    }

  }

}

@Injectable()
export class PreventLogged implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private errorHelper: ErrorHelper,
              private alertsService: AlertsService) { }

  canActivate() {
    if (this.authService.isTokenValid()) {
      this.router.navigate(['/home']).then(() => {
        // TODO - alertWarning
        this.alertsService.alertDanger({
          title: 'Prevention',
          body: 'You are already logged in, no need to access this page.'
        }, 5000);
      }).catch(error => {
        this.errorHelper.handleGenericError(error);
      });
      return false;
    } else {
      return true;
    }
  }

}

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private router: Router,
              private alertsService: AlertsService,
              private errorHelper: ErrorHelper) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userRoles = JSON.parse(sessionStorage.getItem('user')).roles;
    const allowed = route.data['roles'];

    if (allowed.some(a => userRoles.indexOf(a) >= 0)) {
      return true;
    } else {
      this.router.navigate(['/home']).then(() => {
        this.alertsService.alertDanger({
          title: 'Unauthorized Access',
          body: 'You have\'nt got enough privileges to make this request.'
        }, 7500);
        return false;
      }).catch(error => {
        this.errorHelper.handleGenericError(error);
      });
    }
  }

}

@Injectable()
export class IsRequestHashValid implements CanActivate {

  constructor(private registrationSvc: RegistrationService,
              private credResetSvc: CredResetService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    const hash = route.paramMap.get('hash');
    const type = route.data['checkType'];

    switch (type) {
      case checkType.Registration: {
        return new Observable<boolean>(observer => {
          this.registrationSvc.checkRegistrationRequest(hash).subscribe(response => {
            if (response.response.success && response.request) {
              observer.next(true);
              observer.complete();
            } else {
              observer.next(false);
              observer.complete();
            }
          }, error => {
            observer.next(false);
            observer.complete();
          });
        });
      }
      case checkType.PasswordReset: {
        return new Observable<boolean>(observer => {
          this.credResetSvc.checkPasswordResetRequest(hash).subscribe(response => {
            if (response.response.success && response.request) {
              observer.next(true);
              observer.complete();
            } else {
              observer.next(false);
              observer.complete();
            }
          }, error => {
            observer.next(false);
            observer.complete();
          });
        });
      }
    }
  }
}

@Injectable()
export class DataResolver implements Resolve<any> {

  constructor(private registrationSvc: RegistrationService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.registrationSvc.checkRegistrationRequest(route.paramMap.get('hash')).pipe(map(result => {
      if (result.response.success && result.request) {
        return result.request;
      } else {
        return throwError(new Error(result.response));
      }
    }), catchError(error => {
      return throwError(new Error(error));
    }));
  }

}
