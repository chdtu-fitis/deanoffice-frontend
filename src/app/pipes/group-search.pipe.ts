import { Pipe, PipeTransform } from '@angular/core';
import { StudentGroup } from '../models/StudentGroup';

@Pipe({ name: 'groupSearch' })
export class GroupSearchPipe implements PipeTransform {

  transform(items: StudentGroup[], searchText: string): any[] {
    if (!items)
      return [];
    if (!searchText)
      return items;
    searchText = searchText.toLowerCase();
    return items.filter( group => {
      return group.name.toLowerCase().includes(searchText);
    });
  }
}
