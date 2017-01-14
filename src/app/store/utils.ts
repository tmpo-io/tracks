


export const trace = (l) => { console.log('[trace]', l); return l; };

export function deleteKeys(obj, deleteKey: string[]): any {
  return Object.keys(obj)
    .filter(key => deleteKey.indexOf(key) === -1)
    .reduce((result, current) => {
      result[current] = obj[current];
      return result;
    }, {});
}




export class List<T> extends Array<T> {

  static from<T>(items: T[]): T[] {
    return new List(items) as List<T>;
  }

  static fromObj(keys, obj): any[] {
    return new List(keys.map(k => obj[k]));
  }

  constructor(items?: T[]) {
    super();
    if (items) {
      this.addItems(items);
    };
  }

  let(fn: (array: T[]) => T[]) {
    return fn(this);
  }

  do(fn: (array: T[]) => T[]) {
    fn([... this]);
    return this;
  }

  private addItems(items) {
    items.forEach(item => this.push(item));
  }

}

// FROM
// https://github.com/lodash/lodash/blob/master/.internal/baseRange.js

const nativeCeil = Math.ceil;
const nativeMax = Math.max;
const day = 24 * 3600 * 1000;

/**
 * The base implementation of `range` and `rangeRight` which doesn't
 * coerce arguments.
 *
 * @private
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @param {number} step The value to increment or decrement by.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the range of numbers.
 */
export function range(start, end, step = day, fromRight = false) {
  let index = -1;
  let length = nativeMax(nativeCeil((end - start) / (step || 1)), 0);
  const result = Array(length);

  while (length--) {
    result[fromRight ? length : ++index] = start;
    start += step;
  }
  return result;
}
