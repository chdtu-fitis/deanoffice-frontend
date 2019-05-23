import { Injectable } from '@angular/core';
import {Course} from '../models/Course';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CoursePagination} from '../models/course/CoursePagination';
import {CourseFilter} from '../components/course/models/CourseFilter';

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) {
  }

  getCoursesBySemester(semester, hoursPerCredit): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.apiUrl}/courses/hours-per-credit?semester=${semester}&hoursPerCredit=${hoursPerCredit}`);
  }

  createCourse(course: Course) {
    return this.http.post(`${environment.apiUrl}/courses`, course);
  }

  getCourseNames() {
    return this.http.get(`${environment.apiUrl}/courses/names`);
  }

  getCoursesForAdministrator(page: any): Observable<CoursePagination> {
    return this.http.get<CoursePagination>(`${environment.apiUrl}/all-courses`, {params: {page}});
  }

  getFilteredCoursesForAdministrator(filterCourse) {
    return this.http.get<CoursePagination>(`${environment.apiUrl}/filtered-courses`, {params: filterCourse});
  }

}
