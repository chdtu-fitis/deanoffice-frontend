import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SelectiveCourse} from '../models/SelectiveCourse';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {forObservable} from '../components/shared/httpErrors';
import {Observable} from "rxjs";
import {SelectiveCourseStudentDegrees} from '../models/SelectiveCourseStudentDegrees';

const SELECTIVE_COURSE_URL: string = environment.apiUrl + '/selective-courses';

@Injectable()
export class SelectiveCourseService {
  constructor(private httpClient: HttpClient) {
  }

  getSelectiveCourses(studyYear: string, degreeId: number, semester: number): Observable<SelectiveCourse[]> {
    return this.httpClient.get<SelectiveCourse[]>(
      `${SELECTIVE_COURSE_URL}?studyYear=${studyYear}&degreeId=${degreeId}&semester=${semester}`)
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
}
