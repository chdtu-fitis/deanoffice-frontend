import {BaseEntity} from './basemodels/BaseEntity';
import {Course} from './Course';
import {Student} from './Student';

export class Grade extends BaseEntity {
  course: Course;
  student: Student;
  grade: number;
  points: number;
  ects: string;
}
