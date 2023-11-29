import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CourseForStudentService {
  private url = `${environment.apiUrl}/courses-for-students`;

  constructor(private http: HttpClient) {
  }

  createCoursesForStudent(studentDegreeId, body) {
    return this.http.post(`${this.url}/${studentDegreeId}`, body);
  }
}
