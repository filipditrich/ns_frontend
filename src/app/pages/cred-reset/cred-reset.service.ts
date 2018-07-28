import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/index';
import {getUrl} from '../../base/helpers/endpoint.helper';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CredResetService {

  constructor(private http: HttpClient) { }

  requestPasswordReset(payload): Observable<any> {
    return this.http.post(getUrl('PWD_R'), payload);
  }

  sendUsernameToEmail(payload): Observable<any> {
    return this.http.post(getUrl('USN_R'), payload);
  }

  checkPasswordResetRequest(hash: string): Observable<any> {
    return this.http.get<any>(`${getUrl('PWD_R_CHECK')}/${hash}`);
  }

  createNewPassword(hash: string, payload): Observable<any> {
    return this.http.post(`${getUrl('PWD_R')}/${hash}`, payload);
  }


}
