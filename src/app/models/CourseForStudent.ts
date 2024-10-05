import {BaseEntity} from "./basemodels/BaseEntity";
import {StudentDegree} from "./StudentDegree";
import {Course} from "./Course";
import {Teacher} from "./Teacher";
import {CourseType} from "./course-type.enum";

export class CourseForStudent extends BaseEntity {
  course: Course;
  studentDegree: StudentDegree;
  teacher: Teacher;
  courseType: CourseType;
}
