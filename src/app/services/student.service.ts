import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentDegree } from '../models/StudentDegree';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Student } from '../models/Student';

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
      ? { params: { 'new_student': 'true' } }
      : {};
    return this.http.post<StudentDegree>(`${this.url}/degrees`, studentDegree, params);
  }

  assignStudentsToGroup(students, group): Observable<StudentDegree> {
    return this.http.post<StudentDegree>(`${environment.apiUrl}/group/${group}/add-students`, students);
  }

  assignRecordBookNumberToStudents(students): Observable<StudentDegree> {
    return this.http.post<StudentDegree>(`${this.url}/record-book-numbers`, students);
  }

  search(fullName: string = ''): Observable<StudentDegree[]> {
    const [
      surname = '', name = '', patronimic = ''
    ] = fullName.split(' ');
    return this.http.get<StudentDegree[]>(`${this.url}/search`, {
      params: {
        surname,
        name,
        patronimic
      }
    });
  }

  updateStudent(student: Student): Observable<Object> {
    return this.http.put<Student>(`${this.url}/`, student);
  }

  updateStudentDegreesByStudentId(id: number, degrees: StudentDegree[]): Observable<Object> {
    return this.http.put(`${this.url}/${id}/degrees/`, degrees);
  }

  expelStudents(studentDegrees: any[]): Observable<Object> {
    return this.http.post(`${this.url}/degrees/expels`, studentDegrees);
  }

  getStudentsByGroupId(groupId: number): Observable<StudentDegree[]> {
    const url = `${environment.apiUrl}/groups/${groupId}/students`;
    return this.http.get<StudentDegree[]>(url);
  }

  renewStudent(expelledStudent): Observable<Object> {
    return this.http.post(`${this.url}/degrees/expels/renewed`, expelledStudent);
  }

  stopAcademicVacation(student): Observable<Object> {
    return this.http.post(`${this.url}/degrees/academic-vacations/renewed`, student);
  }

  startAcademicVacation(vacationData): Observable<Object> {
    return this.http.post(`${this.url}/degrees/academic-vacations`, vacationData);
  }
}
