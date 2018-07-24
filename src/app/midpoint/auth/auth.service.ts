import { Injectable } from '@angular/core';
import {ICredentials} from './credentials.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // TODO - authentication functions

  // TODO - Observable<IResponse> ?
  logIn(credentials: ICredentials): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, credentials);
  }

  storeUserData(user, token) {
    user.token = token;
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  isLoggedIn() {
    return this.isTokenValid();
  }

  isTokenValid(token?: string) {
    if (!token) {
      const user = sessionStorage.getItem('user');
      if (user) { token = JSON.parse(user).token || false; }
    }

    return token ? !new JwtHelperService().isTokenExpired(token) : false;

  }


}
