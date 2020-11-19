import {Course} from './Course';
import {BaseEntity} from './basemodels/BaseEntity';
import {Teacher} from './Teacher';
import {TypeCycle} from './TypeCycle';
import {Department} from './Department';
import {FieldOfKnowledge} from './FieldOfKnowledge';
import {Degree} from './Degree';

export class SelectiveCourse extends BaseEntity {
  course: Course;
  teacher: Teacher;
  degree: Degree;
  department: Department;
  groupName: string;
  fieldsOfKnowledge: FieldOfKnowledge[];
  trainingCycle: TypeCycle;
  description: string;
  studyYear: number;
  available: boolean;
}
