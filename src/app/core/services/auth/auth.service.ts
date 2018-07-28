import { Injectable } from '@angular/core';
import { IUser } from '../../models/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: string;

  public static storeUserData(user: IUser, token: string) {
    user.token = token;
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  constructor() { }

  isTokenValid(token?: string) {
    if (!token) { this.loadToken(); } else { this.token = token; }
    return this.token ? !new JwtHelperService().isTokenExpired(this.token) : false;
  }

  loadToken() {
    const user = sessionStorage.getItem('user');
    if (user) { this.token = JSON.parse(user).token || false }
  }

}
