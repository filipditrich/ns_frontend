import { forEach } from 'lodash';
import { findByProp } from '../../helpers/general.helper';
// TODO - code interface

export let APP_CODES = {};

export function updateCodes(input) {
  APP_CODES = input;
}

export function getCodeByName(name) {
  return findByProp(APP_CODES, 'name', name);
}
