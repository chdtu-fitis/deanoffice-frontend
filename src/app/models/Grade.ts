import {BaseEntity} from './basemodels/BaseEntity';
import {Course} from './Course';
import {StudentDegree} from './StudentDegree';

export class Grade extends BaseEntity {
  course: Course;
  studentDegree: StudentDegree;
  onTime: boolean;
  grade: number;
  points: number;
  ects: string;
}
