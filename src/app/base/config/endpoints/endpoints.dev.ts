// TODO - endpoint interface
import { findByProp } from '../../helpers/general.helper';

export let APP_ENDPOINTS = {};

export function updateEndpointGroup(group, endpoints) {
  APP_ENDPOINTS[group] = endpoints;
}

export function getById(id: string, group: string = 'agent' ) {
  return findByProp(APP_ENDPOINTS, 'id', id);
}

export function getUrlById(id: string, group: string = 'agent' ) {
  const res = findByProp(APP_ENDPOINTS[group], 'id', id);
  return res ? res.url : undefined;
}
