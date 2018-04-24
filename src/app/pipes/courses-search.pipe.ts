import {Pipe, PipeTransform} from '@angular/core';
import {Course} from "../models/Course";

@Pipe({name: 'coursesSearch'})
export class CoursesSearchPipe implements PipeTransform {
  transform(items: Course[], searchText: string): any[] {
    if (!items)
      return [];
    if (!searchText)
      return items;
    searchText = searchText.toLowerCase();
    return items.filter( course => {
      return course.courseName.name.toLowerCase().includes(searchText);
    });
  }
}
