import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IRegCredentials, IRegReqCredentials} from '../../base/models/credentials.interface';
import {Observable} from 'rxjs/index';
import {getUrl} from '../../base/helpers/endpoint.helper';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  requestRegistration(credentials: IRegReqCredentials): Observable<any> {
    return this.http.post(getUrl('REG_REQ'), credentials);
  }

  checkRegistrationRequest(hash: string): Observable<any> {
    return this.http.get<any>(`${getUrl('REG_CHECK')}/${hash}`);
  }

  sendRegistrationRequest(hash: string, credentials: IRegCredentials): Observable<any> {
    return this.http.post(`${getUrl('REG')}/${hash}`, credentials);
  }


}
