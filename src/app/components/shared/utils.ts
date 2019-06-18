import {DatePipe} from '@angular/common';

export class Utils {
  static dateComparator(filterDate, cellValue) {
    const dateParts = cellValue.split('-');
    const year = Number(dateParts[0]);
    const month = Number(dateParts[1]) - 1;
    const day = Number(dateParts[2]);
    const cellDate = new Date(year, month, day);
    if (cellDate < filterDate) {
      return -1;
    } else if (cellDate > filterDate) {
      return 1;
    } else {
      return 0;
    }

  }

  static formatDate = date => new DatePipe('en-US').transform(date, 'dd.MM.yyyy');

  static partition(array: Array<any>, isValid: Function) {
    return array.reduce(([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    }, [[], []]);
  }


}
