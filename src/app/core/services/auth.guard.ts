import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { AlertsService } from './alerts/alerts.service';
import { ErrorHelper } from '../helpers/error.helper';
import { PreviousRouteService } from './previous-route.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private errorHelper: ErrorHelper,
              private alertsService: AlertsService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authService.isTokenValid()) {
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { return: state.url } })
        .then(() => {
          const hasBeenLogged = sessionStorage.getItem('user') || false;
          if (hasBeenLogged) {
            this.alertsService.alertWarning({
              title: 'Token expired',
              body: 'Your session token has expired, please log in to revoke it.'
            }, 5000);
          } else {
            this.alertsService.alertDanger({
              title: 'You are not logged in',
              body: 'Please log in before accessing this page'
            }, 5000);
          }
        })
        .catch(error => {
          this.errorHelper.handleGenericError(error);
        });
      return false;
    }

  };

}

@Injectable()
export class PreventLogged implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private errorHelper: ErrorHelper,
              private alertsService: AlertsService,
              private previousRouteSvc: PreviousRouteService) { }

  canActivate() {
    if (this.authService.isTokenValid()) {
      console.log(this.previousRouteSvc.getPreviousUrl());
      this.router.navigate(['/user']).then(() => {
        this.alertsService.alertWarning({
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
              private errorHelper: ErrorHelper,
              private previousRouteSvc: PreviousRouteService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userRoles = JSON.parse(sessionStorage.getItem('user')).roles;
    const allowed = route.data['roles'];

    if (allowed.some(a => userRoles.indexOf(a) >= 0)) {
      return true;
    } else {
      console.log(this.previousRouteSvc.getPreviousUrl());
      this.router.navigate(['/user']).then(() => {
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


// @Injectable()
// export class IsRequestHashValid implements CanActivate {
//
//   constructor(private registrationSvc: RegistrationService,
//               private credResetSvc: CredResetService) {
//   }
//
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
//     const hash = route.paramMap.get('hash');
//     const type = route.data['checkType'];
//
//     switch (type) {
//       case checkType.Registration: {
//         return new Observable<boolean>(observer => {
//           this.registrationSvc.checkRegistrationRequest(hash).subscribe(response => {
//             if (response.response.success && response.request) {
//               observer.next(true);
//               observer.complete();
//             } else {
//               observer.next(false);
//               observer.complete();
//             }
//           }, error => {
//             observer.next(false);
//             observer.complete();
//           });
//         });
//       }
//       case checkType.PasswordReset: {
//         return new Observable<boolean>(observer => {
//           this.credResetSvc.checkPasswordResetRequest(hash).subscribe(response => {
//             if (response.response.success && response.request) {
//               observer.next(true);
//               observer.complete();
//             } else {
//               observer.next(false);
//               observer.complete();
//             }
//           }, error => {
//             observer.next(false);
//             observer.complete();
//           });
//         });
//       }
//     }
//   }
// }

// @Injectable()
// export class DataResolver implements Resolve<any> {
//
//   constructor(private registrationSvc: RegistrationService) { }
//
//   resolve(route: ActivatedRouteSnapshot): Observable<any> {
//     return this.registrationSvc.checkRegistrationRequest(route.paramMap.get('hash')).pipe(map(result => {
//       if (result.response.success && result.request) {
//         return result.request;
//       } else {
//         return throwError(new Error(result.response));
//       }
//     }), catchError(error => {
//       return throwError(new Error(error));
//     }));
//   }
//
// }