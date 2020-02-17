import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {CourseForGroup} from '../models/CourseForGroup';
import {ForeignCourses} from '../models/ForeignCourses';
import {environment} from '../../environments/environment';

@Injectable()
export class CourseForGroupService {
  private url = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
  }

  changeCourse(groupId, body) {
    return this.http.put(`${this.url}/groups/${groupId}/courses`, body);
  }

  createCoursesForGroup(groupId, body) {
    return this.http.post(`${this.url}/groups/${groupId}/courses`, body);
  }

  createCoursesForGroupNewSem(semester, courseForGroupIds) {
    const data = {semester, courseForGroupIds};
    return this.http.get<CourseForGroup[]>(`${this.url}/courses/other-semester`, {params: data});
  }

  getCoursesForGroupAndSemester(groupId, semester): Observable<CourseForGroup[]> {
    return this.http.get<CourseForGroup[]>(`${this.url}/groups/${groupId}/courses?semester=${semester}`);
  }

  getForeignCourseAndGroups(): Observable<ForeignCourses[]> {
    return this.http.get<ForeignCourses[]>(`${environment.apiUrl}/courses/foreign/synchronization`);
  }
  // copyCourse(body) {
  //   return this.http.put(`${this.url}/groups-difference-dialog/change-courses-for-group`, body);
  // }
}
