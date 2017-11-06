import {BaseEntity} from "./superclasses/BaseEntity";
import {Course} from "./Course";
import {StudentGroup} from "./StudentGroup";
import {Teacher} from "./Teacher";
export class CourseForGroup extends BaseEntity{
  course: Course;
  studentGroup: StudentGroup;
  teacher: Teacher;
  examDate: Date;
}
