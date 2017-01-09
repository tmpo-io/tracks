


export const trace = (l) => { console.log('[trace]', l); return l; };

export function deleteKeys(obj, deleteKey: string[]): any {
  return Object.keys(obj)
    .filter(key => deleteKey.indexOf(key) === -1)
    .reduce((result, current) => {
      result[current] = obj[current];
      return result;
    }, {});
}


