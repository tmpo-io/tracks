import { Pipe, PipeTransform } from '@angular/core';


const leadZero = str => (str.length === 1) ? '0' + str : str;


@Pipe({
  name: 'timesince'
})
export class TimeSincePipe implements PipeTransform {

  transform(value: number): string {
    let seconds = leadZero(
      '' + (Math.floor(value / 1000) % 60));
    let minutes = leadZero(
    '' + Math.floor(((value / (60000)) % 60)) );
    let hours = leadZero(
      '' + Math.floor((value / (3600000)))
    );
    return `${hours}:${minutes}:${seconds}`;
  }

}


