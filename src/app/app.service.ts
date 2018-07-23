import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as CODE_CONF from './midpoint/config/codes/codes.dev';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  // TODO - code model ?
  obtainCodes(): Promise<any> {
    const headers = new HttpHeaders()
      .append('X-Secret', '937a43fc73c501dfa94d7dcf0cf668e0')
      .append('X-Secret-Index', '5');

    // TODO - <any> => resource interface
    return this.httpClient.get<any>('http://localhost:3001/api/assembly/codes', { headers })
      .toPromise()
      .then(result => {
        if (result.codes) {
          CODE_CONF.updateCodes(result.codes);
          CODE_CONF.getCodeByName('REQUEST_USER_REGISTERED')
        } else {
          // codes were not received
        }
      }, error => {
        // TODO - popups / alerts
        console.log(error);
      });
  }

}
