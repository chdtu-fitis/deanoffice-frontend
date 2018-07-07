import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byStringFilter'
})
export class ByStringPipe implements PipeTransform {

  transform<T>(array: T[] = [], prop: string, propValue: string = ''): any {
    if (!prop) {
      throw new Error('prop is required');
    }
    if (propValue === '') {
      return array;
    }
    propValue = propValue.toLowerCase();
    return array.filter((item: T) => (item[prop] as string).toLowerCase().includes(propValue));
  }

}
