import {Pipe, PipeTransform} from '@angular/core';
import {Course} from "../models/Course";

@Pipe({name: 'coursesSearch'})
export class CoursesSearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || items.length == 0)
      return [];
    if (!searchText)
      return items;
    searchText = searchText.toLowerCase();
    if (!items[0].course) {
      return items.filter( course => {
        return course.courseName.name.toLowerCase().startsWith(searchText);
      })
    } else {
      return items.filter( course => {
        return course.course.courseName.name.toLowerCase().startsWith(searchText);
      });
    }
  }
}
