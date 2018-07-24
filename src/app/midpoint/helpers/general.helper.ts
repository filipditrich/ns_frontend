export function findByProp(o, prop, val, retprop = '') {
  if(o==null) return false;
  if( o[prop] === val ){
    return (retprop) ? o[retprop] : o;
  }
  let result, p;
  for (p in o) {
    if( o.hasOwnProperty(p) && typeof o[p] === 'object' ) {
      result = findByProp(o[p], prop, val);
      if(result){
        return (retprop) ? result[retprop] : result;
      }
    }
  }
  return (retprop) ? result[retprop] : result;
}
