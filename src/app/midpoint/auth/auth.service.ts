import { Injectable } from '@angular/core';
import {ICredentials, IRegCredentials, IRegReqCredentials} from './credentials.interface';
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

  requestRegistration(credentials: IRegReqCredentials): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/request/registration`, credentials);
  }

  checkRegistrationRequest(hash: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/auth/register/${hash}`);
  }

  sendRegistrationRequest(hash: string, credentials: IRegCredentials): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register/${hash}`, credentials);
  }


}
