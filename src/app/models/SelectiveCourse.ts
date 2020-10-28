import {Course} from "./Course";
import {BaseEntity} from "./basemodels/BaseEntity";
import {Teacher} from "./Teacher";
import {TypeCycle} from './TypeCycle';
import {Department} from './Department';

export class SelectiveCourse extends BaseEntity {
  course: Course;
  teacher: Teacher;
  department: Department;
  trainingCycle: TypeCycle;
  studyYear: number;
  available: boolean;
}
