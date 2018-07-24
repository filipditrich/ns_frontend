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
      .append('X-Secret', '937a43fc73c501dfa94d7dcf0cf668e0x7');

    // TODO - <any> => resource interface
    return this.httpClient.get<any>('http://localhost:3001/api/assembly/codes', { headers })
      .toPromise()
      .then(result => {
        if (result.codes) {
          CODE_CONF.updateCodes(result.codes);
          console.log(CODE_CONF.getCodeByName('RESOURCE_LOADED'));

        } else {
          // codes were not
        }
      }, error => {
        // TODO - popups / alerts ???
        console.log(error);
      });
  }

}
