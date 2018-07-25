import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService?: AuthService,
              private router?: Router) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

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

  constructor(private authService: AuthService) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return !this.authService.isTokenValid();
  }

}
