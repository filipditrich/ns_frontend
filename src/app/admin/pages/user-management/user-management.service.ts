import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { getUrl } from '../../../core/config/endpoints.config';

@Injectable({
  providedIn: 'root'
})
export class AdminUserManagementService {

  constructor(private http: HttpClient) { }

  listUsers(): Observable<any> {
    return this.http.get<any>(`${getUrl('ADMIN')}/read/users`);
  }

  getUser(id): Observable<any> {
    return this.http.get<any>(`${getUrl('ADMIN')}/read/users/${id}`);
  }

}
