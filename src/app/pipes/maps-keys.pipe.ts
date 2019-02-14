import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'keys'
})
export class MapsKeysPipe implements PipeTransform {

  transform(value: any, args?: string[]): any {
    const keys = [];
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        keys.push({key: key, value: value[key]});
      }
    }
    return keys;
  }

}
