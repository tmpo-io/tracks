

import { deleteKeys } from './utils';


describe('deletekeys', () => {
  it('should delete keys provided from object', ()=>{

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
