import {BaseEntity} from './basemodels/BaseEntity';

export class Grade extends BaseEntity {
  grade?: number;
  academicDifference: boolean;
  courseId: number;
  onTime: boolean;
  points: number;
  studentDegreeId: number;
  // view property
  wrongInterval: boolean;
  changed: boolean;
}
