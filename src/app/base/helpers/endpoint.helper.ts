import * as CONF_ENDPOINTS from '../config/endpoints/endpoints.dev';
import { API } from '../../../environments/environment';
import {AuthService} from '../auth/auth.service';

export function getUrl(id: string, worker: string = 'agent') {
  let port;
  switch (worker) {
    case 'agent': port = 3000; break;
    case 'backdrop': port = 3001; break;
  }
  const endpoint = CONF_ENDPOINTS.getUrlById(id, worker);

  return endpoint === undefined ? `${API(port)}/` : `${API(port)}${endpoint}`;
}
