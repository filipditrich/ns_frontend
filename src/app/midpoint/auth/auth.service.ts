import { Injectable } from '@angular/core';
import { ICredentials, IRegCredentials, IRegReqCredentials } from '../models/credentials.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { getUrl } from '../helpers/endpoint.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // TODO - authentication functions

  // TODO - Observable<IResponse> ?
  logIn(credentials: ICredentials): Observable<any> {
    return this.http.post(getUrl('LOGIN'), credentials);
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
    return this.http.post(getUrl('REG_REQ'), credentials);
  }

  checkRegistrationRequest(hash: string): Observable<any> {
    return this.http.get(`${getUrl('REG_CHECK')}/${hash}`);
  }

  sendRegistrationRequest(hash: string, credentials: IRegCredentials): Observable<any> {
    return this.http.post(`${getUrl('REG')}/${hash}`, credentials);
  }


}
