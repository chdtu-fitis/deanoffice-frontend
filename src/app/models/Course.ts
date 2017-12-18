import {BaseEntity} from './basemodels/BaseEntity';
import {CourseName} from './CourseName';
import {KnowledgeControl} from './KnowlegeControl';

export class Course extends BaseEntity {
    courseName: CourseName;
    knowlegeControl: KnowledgeControl;
    hours: number;
    credits: number;
}
