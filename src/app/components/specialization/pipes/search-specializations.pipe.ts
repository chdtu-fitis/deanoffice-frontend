import { Pipe, PipeTransform } from '@angular/core';
import {Specialization} from '../../../models/Specialization';

@Pipe({
  name: 'searchSpecializations'
})
export class SearchSpecializationsPipe implements PipeTransform {

  transform(value: Specialization[], name: string): Specialization[] {
    if (name) {
      return value.filter((specialization: Specialization) => this.byName(specialization.name, name));
    }
    return value;
  }

  private byName(itemName: string = '', name: string) {
    return itemName.toLowerCase().match(name.toLowerCase());
  }
}
