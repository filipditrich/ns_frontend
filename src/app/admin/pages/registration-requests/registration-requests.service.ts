import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { getUrl } from '../../../core/config/endpoints.config';

@Injectable({
  providedIn: 'root'
})
export class RegistrationRequestsService {

  constructor(private http: HttpClient) { }

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