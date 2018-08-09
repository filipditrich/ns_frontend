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

  updateUser(id, update): Observable<any> {
    return this.http.put<any>(`${getUrl('ADMIN')}/update/users/${id}`, update);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete<any>(`${getUrl('ADMIN')}/delete/users/${id}`);
  }

}
