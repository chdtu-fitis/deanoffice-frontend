import { Injectable } from '@angular/core';
import {Course} from "../models/Course";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) {
  }

  getCoursesBySemesterAndHoursPerCredit(semester, hoursPerCredit): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.apiUrl}/courses/hours-per-credit?semester=${semester}&hoursPerCredit=${hoursPerCredit}`);
  }

  createCourse(course: Course){
    return this.http.post(`${environment.apiUrl}/courses`, course);
  }

  getCourseNames() {
    return this.http.get(`${environment.apiUrl}/courses/names`);
  }

}
