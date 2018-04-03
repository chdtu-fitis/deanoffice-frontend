import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseForGroup} from '../models/CourseForGroup';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import {Degree} from "../models/Degree";

@Injectable()
export class CourseForGroupService {
  private url = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
  }

  getCoursesBySpecialization(specializationId) {
    return this.http.get<CourseForGroup>(`/coursesforgroups/${specializationId}/courses`).toPromise();
  }

  setCoursesForGroup(body, groupId) {
    return this.http.post(`/coursesforgroups/${groupId}/courses`, body).toPromise();
  }

  getCoursesForGroupAndSemester(groupId, semester): Observable<CourseForGroup[]> {
    return this.http.get<CourseForGroup[]>(`${this.url}/groups/${groupId}/courses?semester=${semester}`);
  }
}
