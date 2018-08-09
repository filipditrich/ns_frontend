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
import {AdminUserManagementService} from '../../admin/pages/user-management/user-management.service';


@Injectable()
export class IsRequestHashValid implements CanActivate {

  constructor(private registrationSvc: RegistrationService,
              private credResetSvc: CredResetService,
              private alertsSvc: AlertsService,
              private errorHelper: ErrorHelper,
              private router: Router,
              private userMgmtSvc: AdminUserManagementService) {
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
      case CheckType.EditUser: {
        return new Observable<any>(observer => {
          this.userMgmtSvc.getUser(hash).subscribe(response => {
            if (response.response.success) {
              observer.next(true);
              observer.complete();
            } else {
              this.router.navigate(['/']).then(() => {
                this.errorHelper.processedButFailed(response);
              }).catch(error => {
                this.errorHelper.handleGenericError(error);
              });
              observer.next(false);
              observer.complete();
            }
          }, err => {
            this.router.navigate(['/']).then(() => {
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

  constructor(private registrationSvc: RegistrationService,
              private userMgmtSvc: AdminUserManagementService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const hash = route.paramMap.get('hash');
    const type = route.data['checkType'];

    switch (type) {
      case CheckType.Registration: {
        return this.registrationSvc.checkRegistrationRequest(hash).pipe(map(result => {
          if (result.response.success && result.request) {
            return result.request;
          } else {
            return throwError(new Error(result.response));
          }
        }), catchError(error => {
          return throwError(new Error(error));
        }));
      }
      case CheckType.EditUser: {
        return this.userMgmtSvc.getUser(hash).pipe(map(result => {
          if (result.response.success && result.output) {
            return result.output[0];
          } else {
            return throwError(new Error(result.response));
          }
        }), catchError(error => {
          return throwError(new Error(error));
        }));
      }
    }

  }

}
