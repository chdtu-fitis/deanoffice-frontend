import {BaseEntity} from './basemodels/BaseEntity';
import {CourseName} from './CourseName';
import {KnowledgeControl} from './KnowlegeControl';

export class Course extends BaseEntity {
  courseName: CourseName;
  knowledgeControl: KnowledgeControl;
  semester: number;
  hours: number;
  credits: number;

  constructor(){
    super();
    this.courseName = new CourseName();
    this.knowledgeControl = new KnowledgeControl();
    this.semester = undefined;
    this.hours = undefined;
    this.credits = undefined;

  }
}
