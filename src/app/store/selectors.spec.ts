

import * as sel from './selectors';

describe('toList', () => {
  it('should transform an object to a list', () => {

    let keys = ['a', 'b', 'c'];
    let obj = {
      'a': { a: 1 },
      'b': { b: 1 },
      'c': { c: 1 }
    };

    let res = sel.toList(keys, obj);
    expect(res[0].a).toBe(1);
    expect(res[2].c).toBe(1);
  });
});

describe('filterTime', () => {
  it('should filter a list of objects between given times', () => {
    let keys = [
      { a: 1, time: 1 },
      { a: 2, time: 2 },
      { a: 3, time: 3 },
      { a: 4, time: 4 },
      { a: 5, time: 5 }
    ];

    let res = keys.filter(sel.filterTime(2, 3));
    expect(res.length).toBe(2);
    res = keys.filter(sel.filterTime(0, 3));
    expect(res.length).toBe(3);
  });
});

describe('time functions', () => {
  it('should return apropieate milliseconds time', () => {
    let m = sel.now();
    let yes = sel.yesterday(m);
    expect(yes).toBe(m - 3600 * 1000 * 24);
    expect(sel.week(m)).toBe(m - 7 * sel.day);
  });
});

describe('sum func', () => {
  it('should reduce to a value', () => {
    let keys = [
      { a: 1, amount: 1 },
      { a: 2, amount: 2 },
      { a: 3, amount: 3 },
      { a: 4, amount: 4 },
      { a: 5, amount: 5 }
    ];
    let res = keys.reduce(sel.sum, 0);
    expect(res).toBe(15);

  });
});


describe('function calcDay', () => {

  it('given a timestamp return the 00:00:00', () => {

    const d = new Date();
    const t = d.getTime();
    const expected = d.setHours(0, 0, 0, 0);
    expect(sel.calcDay(t)).toBe(expected);

  });

});
