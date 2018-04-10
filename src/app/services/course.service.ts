import { Injectable } from '@angular/core';
import {Course} from "../models/Course";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) {
  }

  getCoursesBySemester(semester): Observable<Course[]> {
    return this.http.get<Course[]>(`http://localhost:8080/courses?semester=${semester}`);
  }

  createCourse(course: Course){
    return this.http.post(`http://localhost:8080/courses`, course);
  }

}
