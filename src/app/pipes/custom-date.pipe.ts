import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe extends DatePipe implements PipeTransform {

  transform(value: Date, args?: any): any {
    const inputDate = value.getMonth()  + value.getDate() + value.getFullYear();
    const newDate = new Date();
    const currentDate =  newDate.getMonth()  + newDate.getDate() + newDate.getFullYear();
    if (currentDate == inputDate) {
      return super.transform(value, 'shortTime');
        } else {
          return super.transform(value, 'medium');
        }
      }
}
