import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SelectiveCourse} from '../models/SelectiveCourse';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {forObservable} from '../components/shared/httpErrors';
import {Observable} from 'rxjs';
import {SelectiveCoursesYearParameters} from '../models/SelectiveCoursesYearParameters';
import {SelectiveCoursesStudentDegree} from '../models/SelectiveCoursesStudentDegree';
import {SelectiveCoursesStudentDegreeSubstitution} from '../models/SelectiveCoursesStudentDegreeSubstitution';
import {RegisteredByGroup} from '../components/selective-course/courses-by-group/model/RegisteredByGroup';
import {SelectionRule} from '../components/selective-course/courses-by-group/model/SelectionRule';
const SELECTIVE_COURSE_URL: string = environment.apiUrl + '/selective-courses';

@Injectable()
export class SelectiveCourseService {
  constructor(private httpClient: HttpClient) {
  }

  getSelectiveCourses(studyYear: string, degreeId: number, semester: number, all?: boolean): Observable<SelectiveCourse[]> {
    all = Boolean(all);
    return this.httpClient.get<SelectiveCourse[]>(
      `${SELECTIVE_COURSE_URL}?studyYear=${studyYear}&degreeId=${degreeId}&semester=${semester}&all=${all}`)
      .pipe(catchError(forObservable('Отримання списку вибіркових предметів', [])));
  }

  getSelectiveCoursesWithStudentsCount(studyYear: string, degreeId: number, semester: number, all?: boolean): Observable<SelectiveCourse[]> {
    all = Boolean(all);
    return this.httpClient.get<SelectiveCourse[]>(
      `${SELECTIVE_COURSE_URL}/students-count?studyYear=${studyYear}&degreeId=${degreeId}&semester=${semester}&all=${all}`)
      .pipe(catchError(forObservable('Отримання списку вибіркових предметів', [])));
  }

  getSelectiveCoursesForThisAcademicYear(degreeId: number, semester: number): Observable<SelectiveCourse[]> {
    return this.httpClient.get<SelectiveCourse[]>(
      `${SELECTIVE_COURSE_URL}?degreeId=${degreeId}&semester=${semester}&thisYear=true`)
      .pipe(catchError(forObservable('Отримання списку вибіркових предметів', [])));
  }

  createSelectiveCourse(body) {
    return this.httpClient.post(`${SELECTIVE_COURSE_URL}`, body);
  }

  updateSelectiveCourse(id, body) {
    return this.httpClient.put(`${SELECTIVE_COURSE_URL}/${id}`, body);
  }

  deleteSelectiveCourse(id) {
    return this.httpClient.delete(`${SELECTIVE_COURSE_URL}/${id}`);
  }

  getSelectiveCourseStudents(selectiveCourseId: number, forFaculty: boolean): any {
    return this.httpClient.get(`${SELECTIVE_COURSE_URL}/course-students?selectiveCourseId=${selectiveCourseId}&forFaculty=${forFaculty}`);
  }

  disqualifySelectiveCourses(selectiveCourseIds: number[]) {
    const body = selectiveCourseIds;
    return this.httpClient.patch(`${SELECTIVE_COURSE_URL}/disqualification`, body);
  }

  createYearParameters(yearParametersEarlyPeriod: SelectiveCoursesYearParameters, yearParametersLatePeriod: SelectiveCoursesYearParameters) {
    const body = [yearParametersEarlyPeriod, yearParametersLatePeriod];
    return this.httpClient.post(`${environment.apiUrl}/selective-courses-year-parameters`, body);
  }

  getYearParameters(studyYear: string): Observable<SelectiveCoursesYearParameters[]> {
    return this.httpClient.get<SelectiveCoursesYearParameters[]>(`${environment.apiUrl}/selective-courses-year-parameters?year=${studyYear}`);
  }

  getStudentCoursesBySurname(all: boolean, studyYear: string, surname: string): Observable<SelectiveCoursesStudentDegree[]> {
    return this.httpClient.get<SelectiveCoursesStudentDegree[]>(
      `${SELECTIVE_COURSE_URL}/student-courses-by-surname?all=${all}&studyYear=${studyYear}&surname=${surname}`);
  }

  substituteSelectiveCoursesForStudentDegree(selectiveCoursesStudentDegreeSubstitution: SelectiveCoursesStudentDegreeSubstitution): Observable<any> {
    return this.httpClient.patch(`${SELECTIVE_COURSE_URL}/substitution`, selectiveCoursesStudentDegreeSubstitution);
  }

  assignMultipleCoursesForMultipleStudents(body) {
    return this.httpClient.post(`${SELECTIVE_COURSE_URL}/registration/multiple`, body);
  }

  // enrollStudentInSelectiveCourses(selectiveCoursesStudentDegreeWithStudyYear: SelectiveCoursesStudentDegreeWithStudyYear): Observable<any> {
  //   return this.httpClient.post(`${SELECTIVE_COURSE_URL}/enrolling`, selectiveCoursesStudentDegreeWithStudyYear);
  // }

  getRegisteredStudentsAndCourseInGroup(groupId: number, studyYear: number): Observable<RegisteredByGroup> {
    const SELECTIVE_COURSE_STATISTICS_URL: string = environment.apiUrl + '/selective-courses-statistics';
    return this.httpClient.get<RegisteredByGroup>(`${SELECTIVE_COURSE_STATISTICS_URL}/registered-by-group?studyYear=${studyYear}&groupId=${groupId}`);
  }

  getSelectionRules(degreeId: number, studentsYear: number): Observable<SelectionRule[]> {
    const SELECTION_RULES_URL: string = SELECTIVE_COURSE_URL + '/selection-rules';
    return this.httpClient.get<SelectionRule[]>(`${SELECTION_RULES_URL}?degreeId=${degreeId}&studentsYear=${studentsYear}`);
  }
}
