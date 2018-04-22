import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentDegree} from '../models/StudentDegree';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Student} from '../models/Student';

@Injectable()
export class StudentService {
  private url = `${environment.apiUrl}/students`;

  constructor(private http: HttpClient) {
  }

  getInitialStudents(): Observable<StudentDegree[]> {
    return this.http.get<StudentDegree[]>(`${this.url}/degrees`);
  }

  getStudents(): Observable<StudentDegree[]> {
    return this.http.get<StudentDegree[]>(`${this.url}/degrees/more-detail`);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.url}/${id}`);
  }

  getPhoto(id: number) {
    return this.http.get(`${this.url}/${id}/photo`, { responseType: 'blob' });
  }

  getDegreesByStudentId(id: number): Observable<StudentDegree> {
    return this.http.get<StudentDegree>(`${this.url}/${id}/degrees/`);
  }

  getExpelledStudents(): Observable<StudentDegree[]> {
    return this.http.get<StudentDegree[]>(`${this.url}/degrees/expels`);
  }

  getStudentsInAcademicVacation(): Observable<StudentDegree[]> {
    return this.http.get<StudentDegree[]>(`${this.url}/degrees/academic-vacations`);
  }

  addStudentDegree(studentDegree): Observable<StudentDegree> {
    const params = !studentDegree.student.id
      ? { params: { new_student: 'true' }}
      : {};
    return this.http.post<StudentDegree>(`${this.url}/degrees`, studentDegree, params);
  }

  search(fullName: string = ''): Observable<StudentDegree[]> {
    const [surname = '', name = '', patronimic = ''] = fullName.split(' ');
    return this.http.get<StudentDegree[]>(`${this.url}/search`, {
      params: {
        surname,
        name,
        patronimic,
      }
    });
  }

  updateStudent(student: Student) {
    return this.http.put<Student>(`${this.url}/`, student);
  }

  updateStudentDegreesByStudentId(id: number, degrees: StudentDegree[]) {
    return this.http.put(`${this.url}/${id}/degrees/`, degrees);
  }

  updatePhoto(id: number, photo) {
    return this.http.put(`${this.url}/${id}/photo`, photo);
  }

  expelStudents(studentDegrees: any[]) {
    return this.http.post(`${this.url}/degrees/expels`, studentDegrees);
  }

  renewStudent(expelledStudent) {
    return this.http.post(`${this.url}/degrees/expels/renewed`, expelledStudent);
  }

}
