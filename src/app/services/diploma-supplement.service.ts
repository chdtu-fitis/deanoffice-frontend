import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {FileService} from './file-service';
import {catchError} from 'rxjs/operators';
import {forObservable} from '../components/shared/httpErrors';
import {Degree} from "../models/Degree";
import {HttpClient} from "@angular/common/http";
import {DataForSupplementStudentCheck} from "../models/custom/DataForSupplementStudentCheck";
import {Observable} from "rxjs";

@Injectable()
export class DiplomaSupplementService {
  private documentsUrl = `${environment.apiUrl}/documents`;
  constructor(private fileService: FileService, private http: HttpClient) {
  }

  buildDiplomaSupplement(studentId: string): any {
    const url = `${this.documentsUrl}/supplements/degrees/${studentId}/docx`;
    return this.fileService.downloadFile(url).pipe(catchError(forObservable('Формування додатку до диплома', [])))
  }

  buildGradePercent(groupId: string): any {
    const url = `${this.documentsUrl}/percentagereport/groups/${groupId}/docx`;
    return this.fileService.downloadFile(url).pipe(catchError(forObservable('Формування документу з процентами оцінок студентів', [])))
  }

  buildFullGradesTableReport(groupId: string): any {
    const url = `${this.documentsUrl}/grouptablereport/groups/${groupId}`;
    return this.fileService.downloadFile(url).pipe(catchError(forObservable('Формування шахматки', [])))
  }

  buildFullCoursesTableReport(groupId: string): any {
    const url = `${this.documentsUrl}/groups/${groupId}/graduate-courses`;
    return this.fileService.downloadFile(url).pipe(catchError(forObservable('Формування шахматки', [])))
  }

  checkStudentsData(degreeId: string): Observable<DataForSupplementStudentCheck[]> {
    const url = `${this.documentsUrl}/supplements/data-check`;
    return this.http.get<DataForSupplementStudentCheck[]>(url,{params: {degreeId}});
  }

  checkStudentsGrades(degreeId: string): Observable<DataForSupplementStudentCheck[]> {
    const url = `${this.documentsUrl}/supplements/grade-check`;
    return this.http.get<DataForSupplementStudentCheck[]>(url,{params: {degreeId}});
  }

}
