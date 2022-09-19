import {Pipe, PipeTransform} from '@angular/core';
import {Course} from "../models/Course";

@Pipe({name: 'coursesSearchTrainingCycle'})
export class CoursesSearchTrainingCyclePipe implements PipeTransform {
  transform(items: any[], trainingCycle: string): any[] {
    if (!items || items.length == 0)
      return [];
      if (!trainingCycle) {
        return items;
      }
      if (trainingCycle === "ALL"){
        return items
      }
      return items.filter(course => {
        return course.trainingCycle === trainingCycle;
      })
    }
  }
