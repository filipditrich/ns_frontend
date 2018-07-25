import * as CONF_ENDPOINTS from '../config/endpoints/endpoints.dev';
import { API } from '../../../environments/environment';

export function getUrl(id: string, worker: string = 'agent') {
  let port;
  switch (worker) {
    case 'agent': port = 3000; break;
    case 'backdrop': port = 3001; break;
  }
  return `${API(port)}${CONF_ENDPOINTS.getUrlById(id, worker)}`;
}
