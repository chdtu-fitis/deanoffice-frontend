import {Course} from './Course';
import {NameEntity} from './basemodels/NameEntity';

export class ForeignCourses {
  common: Course[];
  differentForeignCourses: Course[];
  differentOtherCourses: Course[];
  otherGroup: NameEntity;
  foreignGroup: NameEntity;

}
