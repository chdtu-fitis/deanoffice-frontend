import {BaseEntity} from './basemodels/BaseEntity';
import {CourseName} from './CourseName';
import {KnowledgeControl} from './KnowlegeControl';

export class Course extends BaseEntity {
  courseName: CourseName;
  knowledgeControl: KnowledgeControl;
  semester: number;
  hours: number;
  credits: number;
  hoursPerCredit: number;
  selected?: boolean;

  static same(c, course: Course) {
    return c.courseName.name === course.courseName.name &&
           c.hours === course.hours &&
           c.hoursPerCredit === course.hoursPerCredit &&
           c.knowledgeControl.id === course.knowledgeControl.id
  }

}
