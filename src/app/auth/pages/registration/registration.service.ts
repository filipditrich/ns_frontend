import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { getUrl } from '../../../core/config/endpoints.config';
import { IRegistrationCredentials, IRegistrationRequest } from '../../../core/models/credentials.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  requestRegistration(credentials: IRegistrationRequest): Observable<any> {
    return this.http.post<any>(getUrl('REG_REQ'), credentials);
  }

  checkRegistrationRequest(hash: string): Observable<any> {
    return this.http.get<any>(`${getUrl('REG_CHECK')}/${hash}`);
  }

  registerUser(hash: string, credentials: IRegistrationCredentials): Observable<any> {
    return this.http.post<any>(`${getUrl('REG')}/${hash}`, credentials);
  }
}
