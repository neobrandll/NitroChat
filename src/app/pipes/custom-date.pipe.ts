import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe extends DatePipe implements PipeTransform {

  transform(value: Date, args?: any): any {
    const inputDate = value.getTime() / 1000;
    const currentDate = new Date().getTime() / 1000;
    let resultTime = currentDate - inputDate;
    if (resultTime < 60) {
      if (resultTime < 0) {
        resultTime = 0;
      }
      return `Today ${Math.round(resultTime)}seg ago `;
    } else {
      resultTime = resultTime / 60;
      if (resultTime < 60) {
        return `Today ${Math.round(resultTime)}m ago `;
      } else {
        resultTime = resultTime / 60;
        if (resultTime < 24) {
          return  `Today ${Math.round(resultTime)}h ago `;
        } else {
          return super.transform(value, 'medium');
        }
      }
    }
  }
}
