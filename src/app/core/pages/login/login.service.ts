import { Injectable } from '@angular/core';
import { ICredentials } from '../../models/credentials.interface';
import { Observable } from 'rxjs/internal/Observable';
import { ILoginResponse } from '../../models/response.interface';
import { HttpClient } from '@angular/common/http';
import { getUrl } from '../../config/endpoints.config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  logInRequest(credentials: ICredentials): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(getUrl('LOGIN', 'auth'), credentials);
  }

}
