/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { TimeSincePipe } from './time.pipe';

describe('TimeSincePipe', () => {
  it('should convert from milliseconds', () => {
    let pipe = new TimeSincePipe();
    expect(pipe).toBeTruthy();

    let res = [
      [1000, '00:00:01'],
      [60000, '00:01:00'],
      [61000, '00:01:01'],
      [60000 * 60, '01:00:00'],
      [0, '00:00:00']
    ];

    res.map(item => {
      expect(pipe.transform(item[0])).toBe(item[1]);
    });

  });
});
