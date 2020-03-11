import {CourseForStipend} from "./CourseForStipend";

export class StudentStipendInfo {
  id: number;
  surname: string;
  name: string;
  patronimic: string;
  year: number;
  groupName: string;
  averageGrade: number;
  extraPoints: number;
  oldExtraPoints: string;
  finalPoints: number;
  debtCourses: CourseForStipend[];
}
