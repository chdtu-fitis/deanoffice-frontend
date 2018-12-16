import { Injectable } from '@angular/core';
import { Course } from '../models/Course';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CourseName } from '../models/CourseName';

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) {}

  getCoursesBySemester(semester): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.apiUrl}/courses?semester=${semester}`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${environment.apiUrl}/courses`, course);
  }

  getCourseNames(): Observable<CourseName[]> {
    return this.http.get<CourseName[]>(`${environment.apiUrl}/courses/names`);
  }

}
