export enum Team {
  ns = 'Northern Stars',
  other = 'Other'
}

export namespace Team {
  export function values() {
    return Object.keys(Team).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
  }
}
