import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {FileService} from './file-service';
import {catchError} from 'rxjs/operators';
import {forObservable} from '../components/shared/httpErrors';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataForSupplementStudentCheck} from "../models/custom/DataForSupplementStudentCheck";
import {DataForSupplementCourseTranslationCheck} from '../models/custom/DataForSupplementCourseTranslationCheck';

@Injectable()
export class DiplomaSupplementService {
  private documentsUrl = `${environment.apiUrl}/documents`;
  constructor(private fileService: FileService, private http: HttpClient) {
  }

  buildDiplomaSupplement(studentId: string): any {
    const url = `${this.documentsUrl}/supplements/degrees/${studentId}/docx`;
    return this.fileService.downloadFile(url).pipe(catchError(forObservable('Формування додатку до диплома', [])))
  }

  buildGraduatesReport(groupId: string): any {
    const url = `${this.documentsUrl}/graduates/${groupId}/report`;
    return this.fileService.downloadFile(url).pipe(catchError(forObservable('Формування відомості випускників', [])))
  }

  buildGraduateWorkReport(groupId: string): any {
    const url = `${this.documentsUrl}/qualification-work-report?groupId=${groupId}`;
    return this.fileService.downloadFile(url).pipe(catchError(forObservable('Формування відомості випускників', [])))
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

  checkCoursesTranslation(degreeId: string): Observable<DataForSupplementCourseTranslationCheck[]> {
    const url = `${this.documentsUrl}/supplements/check-courses-translation`;
    return this.http.get<DataForSupplementCourseTranslationCheck[]>(url,{params: {degreeId}});
  }
}
