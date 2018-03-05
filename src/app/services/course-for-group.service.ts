import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseForGroup} from '../models/CourseForGroup';

@Injectable()
export class CourseForGroupService {

  constructor(private http: HttpClient) {
  }

  getCoursesBySpecialization(specializationId) {
    return this.http.get<CourseForGroup>(`/coursesforgroups/${specializationId}/courses`).toPromise();
  }

  setCoursesForGroup(body, groupId) {
    return this.http.post(`/coursesforgroups/${groupId}/courses`, body).toPromise();
  }
}
