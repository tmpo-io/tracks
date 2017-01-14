

import { deleteKeys, List, range } from './utils';


describe('deletekeys', () => {
  it('should delete keys provided from object', () => {

    let obj = {
      a: 1,
      b: 2,
      c: 3,
      d: 4
    };

    let res = deleteKeys(obj, ['a', 'b']);
    expect(res.b).toBeUndefined();
    expect(Object.keys(res).length).toBe(2);
    // expect to not mutate original
    expect(Object.keys(obj).length).toBe(4);
    let m = deleteKeys(obj, ['a']);
    expect(m.a).toBeUndefined();
    expect(Object.keys(m).length).toBe(3);


  });
});


describe('list like array', () => {

  let m;

  beforeEach(() => {
    m = List.from([1, 2, 3, 4]);
  });

  it('should behave like an array', () => {
    expect(m[0]).toBe(1);
    expect(m.length).toBe(4);
    expect(m.reverse()[0]).toBe(4);
  });

  it('should allow the let operator', () => {
    const letFunc = (list) => list.map(v => v + v);
    let result = m.let(letFunc);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(4);
  });

  it('should be constructer from a map with keys', () => {

    const keys = ['a', 'b', 'c'];
    const vals = {
      a: 1,
      b: 2,
      c: 3
    };

    let result = List.fromObj(keys, vals);
    expect(result[0]).toBe(1);
  });

});


describe('range', () => {

  it('iterable between a date and another', () => {
    let f = range(1, 10, 1);
    expect(f.length).toBe(9);
    expect(f[0]).toBe(1);
    expect(f[8]).toBe(9);
  });

});
