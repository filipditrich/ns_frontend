import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CODE_CONF from './base/config/codes/codes.dev';
import * as ENDPOINTS_CONF from './base/config/endpoints/endpoints.dev';
import { API } from '../environments/environment';
import { IResource } from './base/models/config.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  startupConfig(): Promise<any> {

    return Promise.all([
      this.obtainCodes(), // must be first
      this.obtainRoutes()
    ]);

  }

  // TODO - code model ?
  obtainCodes(): Promise<any> {

    const headers = new HttpHeaders()
      .append('X-Secret', '937a43fc73c501dfa94d7dcf0cf668e0x7');

    // TODO - <any> => resource interface
    return this.httpClient.get<IResource>(`${API(3001)}/api/assembly/codes`, { headers })
      .toPromise()
      .then(result => {
        if (result.codes) {
          CODE_CONF.updateCodes(result.codes);
          console.log(CODE_CONF.getCodeByName('RESOURCE_LOADED'));
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

    return this.httpClient.get<IResource>(`${API(3001)}/api/assembly/routes/agent`, { headers })
      .toPromise()
      .then(result => {
        if (result.endpoints) {
          ENDPOINTS_CONF.updateEndpointGroup('agent', result.endpoints);
          console.log(CODE_CONF.getCodeByName('RESOURCE_LOADED'));
        } else {
          // endpoints were not received
        }
      }, error => {
        console.log(error);
      });
  }


}
