import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentDegree} from '../models/StudentDegree';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Student} from '../models/Student';

function convertDataURIToBinary(dataURI) {
  const BASE64_MARKER = ';base64,';
  const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  const base64 = dataURI.substring(base64Index);
  const raw = window.atob(base64);
  const rawLength = raw.length;
  const array = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

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

  updatePhoto(id: number, photo: WindowBase64) {
    // const byteArray = convertDataURIToBinary(photo);
    return this.http.put(`${this.url}/${id}/photo`, photo);
  }
}
