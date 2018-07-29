import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IResource } from '../models/config.interface';
import { API } from '../../../environments/environment';

import * as _cc from '../config/codes.config';
import * as _ec from '../config/endpoints.config';


@Injectable({
  providedIn: 'root'
})
export class PreloadInitializer {

  constructor(private http: HttpClient) { }

  startupConfig(): Promise<any> {
    return Promise.all([
      this.obtainCodes(),
      this.obtainRoutes()
    ]);
  }

  // TODO - code model ?
  obtainCodes(): Promise<any> {

    const headers = new HttpHeaders()
      .append('X-Secret', '937a43fc73c501dfa94d7dcf0cf668e0x7');

    // TODO - <any> => resource interface
    return this.http.get<IResource>(`${API(3001)}/api/assembly/codes`, { headers })
      .toPromise()
      .then(result => {
        if (result.codes) {
          _cc.updateCodes(result.codes);
          console.log('[%s] Codes', _cc.getCodeByName('RESOURCE_LOADED').name);
        } else {
          // codes were not received
        }
      }, error => {
        // TODO - popups / alerts ???
        console.log(error);
      });
  }

  obtainRoutes(): Promise<any> {

    const headers = new HttpHeaders()
      .append('X-Secret', '937a43fc73c501dfa94d7dcf0cf668e0x7');

    return this.http.get<IResource>(`${API(3001)}/api/assembly/routes/agent`, { headers })
      .toPromise()
      .then(result => {
        if (result.endpoints) {
          _ec.updateEndpointGroup('agent', result.endpoints);
          console.log('[%s] Endpoints', _cc.getCodeByName('RESOURCE_LOADED').name);
        } else {
          // endpoints were not received
        }
      }, error => {
        // TODO - popups / alerts ???
        console.log(error);
      });
  }

}
