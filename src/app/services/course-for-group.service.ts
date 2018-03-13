import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseForGroup} from '../models/CourseForGroup';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CourseForGroupService {

  constructor(private http: HttpClient) {
  }

  getCoursesBySemester(semester): Observable<CourseForGroup[]> {
    return this.http.get<CourseForGroup[]>(`http://localhost:8080/courses/${semester}`);
  }

  getCoursesBySemesterAndGroupID(id, semester): Observable<CourseForGroup[]> {
    return this.http.get<CourseForGroup[]>(`http://localhost:8080/${id}/${semester}/courses`);
  }
}
