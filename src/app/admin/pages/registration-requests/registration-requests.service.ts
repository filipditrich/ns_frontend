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
    // TODO - on backend
    return this.http.post(getUrl('INV_REQ', 'admin'), emails);
  }

  approveRequest(hash: string): Observable<any> {
    return this.http.put<any>(`${getUrl('APPROVE', 'admin')}/${hash}`, {});
  }

  listRequests(): Observable<any> {
    return this.http.get<any>(`${getUrl('ADMIN', 'admin')}/read/registration-requests`);
  }

}
