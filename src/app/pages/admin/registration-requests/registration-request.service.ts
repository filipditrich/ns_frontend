import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/index';
import {getUrl} from '../../../base/helpers/endpoint.helper';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationRequestService {

  constructor(private http: HttpClient) { }

  // todo - transfer to admin svc
  sendInvitations(emails: string | string[]): Observable<any> {
    console.log(getUrl('INV_REQ'));
    return this.http.post(getUrl('INV_REQ'), emails);
  }

  approveRequest(hash: string): Observable<any> {
    return this.http.put<any>(`${getUrl('APPROVE')}/${hash}`, {});
  }

  listRequests(): Observable<any> {
    return this.http.get<any>(getUrl('LIST_REQS'));
  }

}
