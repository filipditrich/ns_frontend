import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IResource } from '../models/config.interface';
import { API } from '../../../environments/environment';

import * as _cc from '../config/codes.config';
import * as _ec from '../config/endpoints.config';
import {ErrorHelper} from '../helpers/error.helper';
import {EndpointGroup} from '../enums/endpoint.enum';


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
          console.error('[ERR_LOADING] Codes', result);
        }
      }, error => {
        console.error('[ERR_LOADING] Codes', error);
      });
  }

  obtainRoutes(): Promise<any> {

    const headers = new HttpHeaders()
      .append('X-Secret', '937a43fc73c501dfa94d7dcf0cf668e0x7');


    const promises = [];

    EndpointGroup.values().forEach(worker => {
      worker = worker.toLowerCase();
      const promise = new Promise((resolve, reject) => {
        this.http.get<IResource>(`${API(3001)}/api/assembly/routes/${worker}`, { headers }).toPromise()
          .then(result => {
            if (result.endpoints) {
              _ec.updateEndpointGroup(worker, result.endpoints);
              resolve();
            } else {
              reject('[ERR_LOADING] Endpoints: ' + result);
            }
          }, error => {
            reject('[ERR_LOADING] Endpoints: ' + error);
          });
      });
      promises.push(promise);
    });

    return Promise.all(promises);

  }

  // obtainVariables(): Promise<any> {
  //
  //   const headers = new HttpHeaders()
  //     .append('X-Secret', '937a43fc73c501dfa94d7dcf0cf668e0x7');
  //
  //
  //   const promises = [];
  //
  // }

}
