import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/Course';
import { Teacher } from '../models/Teacher';

@Pipe({ name: 'teacherSearch' })
export class TeacherSearchPipe implements PipeTransform {

  transform(items: Teacher[], searchText: string): any[] {
    if (!items)
      return [];
    if (!searchText)
      return items;
    searchText = searchText.toLowerCase();
    return items.filter( teacher => {
      return teacher.surname.toLowerCase().includes(searchText);
    });
  }

}
