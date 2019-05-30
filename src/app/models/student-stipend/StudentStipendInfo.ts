import {CourseForStipend} from "./CourseForStipend";

export class StudentStipendInfo {
  id: number;
  surname: string;
  name: string;
  patronimic: string;
  degreeName: string;
  groupName: string;
  year: number;
  tuitionTerm: string;
  specialityCode: string;
  specialityName: string;
  specializationName: string;
  departmentAbbreviation: string;
  averageGrade: number;
  extraPoints: number;
  finalPoints: number;
  debtCourses: CourseForStipend[];
}
