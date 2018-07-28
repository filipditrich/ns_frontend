import { Injectable } from '@angular/core';
import {ICredentials, ILoginResponse} from '../models/credentials.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { getUrl } from '../helpers/endpoint.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: string;

  public static storeUserData(user, token) {
    user.token = token;
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  constructor(private http: HttpClient) { }

  isTokenValid(token?: string) {
    if (!token) { this.loadToken(); } else { this.token = token; }
    return this.token ? !new JwtHelperService().isTokenExpired(this.token) : false;
  }

  loadToken() {
    const user = sessionStorage.getItem('user');
    if (user) { this.token = JSON.parse(user).token || false; }
  }

  logIn(credentials: ICredentials): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(getUrl('LOGIN'), credentials);
  }

}
