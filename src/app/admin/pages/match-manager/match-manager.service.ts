import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {getUrl} from '../../../core/config/endpoints.config';
import {EndpointGroup} from '../../../core/enums/endpoint.enum';
import {IResponse} from '../../../core/models/response.interface';
import {IMatch} from '../../../core/models/match.interface';

@Injectable({
  providedIn: 'root'
})
export class MatchManagerService {

  constructor(private http: HttpClient) { }

  listMatches(): Observable<{ response: IResponse, output: IMatch[] }> {
    return this.http.get<{ response: IResponse, output: IMatch[] }>(`${getUrl('CRUD', EndpointGroup.Sport)}/matches`);
  }

  getMatch(id): Observable<{ response: IResponse, output: IMatch }> {
    return this.http.get<{ response: IResponse, output: IMatch }>(`${getUrl('CRUD', EndpointGroup.Sport)}/matches/${id}`);
  }

}
