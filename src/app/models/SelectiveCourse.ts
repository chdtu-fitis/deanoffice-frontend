import {Course} from "./Course";
import {BaseEntity} from "./basemodels/BaseEntity";
import {Teacher} from "./Teacher";

export class SelectiveCourse {
  id: number;
  course: Course;
  teacher: Teacher;
  studyYear: number;
  available: boolean;
}
