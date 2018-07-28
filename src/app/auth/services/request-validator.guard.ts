import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { RegistrationService } from '../pages/registration/registration.service';
import { CredResetService } from '../pages/reset/reset.service';
import { CheckType } from '../../core/enums/check.enum';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import { AlertsService } from '../../core/services/alerts/alerts.service';
import { ErrorHelper } from '../../core/helpers/error.helper';


@Injectable()
export class IsRequestHashValid implements CanActivate {

  constructor(private registrationSvc: RegistrationService,
              private credResetSvc: CredResetService,
              private alertsSvc: AlertsService,
              private errorHelper: ErrorHelper,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    const hash = route.paramMap.get('hash');
    const type = route.data['checkType'];

    switch (type) {
      case CheckType.Registration: {
        return new Observable<boolean>(observer => {
          this.registrationSvc.checkRegistrationRequest(hash).subscribe(response => {
            if (response.response.success && response.request) {
              observer.next(true);
              observer.complete();
            } else {
              this.router.navigate(['/login']).then(() => {
                this.errorHelper.processedButFailed(response);
              }).catch(error => {
                this.errorHelper.handleGenericError(error);
              });
              observer.next(false);
              observer.complete();
            }
          }, err => {
            this.router.navigate(['/login']).then(() => {
              this.errorHelper.handleGenericError(err);
            }).catch(error => {
              this.errorHelper.handleGenericError(error);
            });
            observer.next(false);
            observer.complete();
          });
        });
      }
      case CheckType.PasswordReset: {
        return new Observable<boolean>(observer => {
          this.credResetSvc.checkPasswordResetRequest(hash).subscribe(response => {
            if (response.response.success) {
              observer.next(true);
              observer.complete();
            } else {
              this.router.navigate(['/login']).then(() => {
                this.errorHelper.processedButFailed(response);
              }).catch(error => {
                this.errorHelper.handleGenericError(error);
              });
              observer.next(false);
              observer.complete()
            }
          }, err => {
            this.router.navigate(['/login']).then(() => {
              this.errorHelper.handleGenericError(err);
            }).catch(error => {
              this.errorHelper.handleGenericError(error);
            });
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
