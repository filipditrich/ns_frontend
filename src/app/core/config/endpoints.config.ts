import { EndpointGroup } from '../enums/endpoint.enum';
import { findByProp } from '../helpers/functions.helper';
import { API } from '../../../environments/environment';

export let ENDPOINTS = {};

export function updateEndpointGroup(group: string, endpoints: any) {
  ENDPOINTS[group] = endpoints;
}

export function getById(id: string, group: string = EndpointGroup.Agent) {
  return findByProp(ENDPOINTS, 'id', id);
}

export function getUrlById(id: string, group: string = EndpointGroup.Agent) {
  const res = findByProp(ENDPOINTS[group], 'id', id);
  return res ? res.url : undefined;
}

export function getUrl(id: string, worker: string = EndpointGroup.Agent) {
  let port;
  switch (worker) {
    case EndpointGroup.Agent: port = 3000; break;
    case EndpointGroup.Backdrop: port = 3001; break;
  }
  const endpoint = getUrlById(id, worker);

  return endpoint === undefined ? `${API(port)}/` : `${API(port)}${endpoint}`;
}
