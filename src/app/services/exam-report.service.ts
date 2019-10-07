import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {FileService} from './file-service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {saveAs} from 'file-saver';

@Injectable()
export class ExamReportService {
  private documentsUrl = `${environment.apiUrl}/documents`;

  constructor(private fileService: FileService,
              private http: HttpClient) { }

  buildExamReport(groupId: number, courseIds: number[]): any {
      const url = `${this.documentsUrl}/exam-report/groups/${groupId}/docx?courseIds=${courseIds}`;
      return this.fileService.downloadFile(url);
  }

  buildExamReportJournalDoc(year: number, degreeId: number, semester: number): any {
    const url = `${this.documentsUrl}/exam-reports-journal-courses/year/${year}/degree/${degreeId}?semester=${semester}`;
    return this.fileService.downloadFile(url);
  }

  buildFormRatingGradeJornalDocx(year: number, degree: number, semester: number, tuitionForm: string): any {
    const url = `${this.documentsUrl}/form-rating/year/${year}/degree/${degree}/docx?semester=${semester}&tuitionForm=${tuitionForm}`;
    return this.fileService.downloadFile(url);
  }

  buildFormRatingGradeJornalPdf(year: number, degree: number, semester: number, tuitionForm: string): any {
    const url = `${this.documentsUrl}/form-rating/year/${year}/degree/${degree}/pdf?semester=${semester}&tuitionForm=${tuitionForm}`;
    return this.fileService.downloadFile(url);
  }

  buildGradesJournalStudentsPdf(year: number, degreeId: number): any {
    const url = `${this.documentsUrl}/grades-journal/students?degreeId=${degreeId}&year=${year}`;
    return this.fileService.downloadFile(url);
  }

  buildGradesJournalCoursesPdf(year: number, degreeId: number): any {
    const url = `${this.documentsUrl}/grades-journal/courses/pdf?degreeId=${degreeId}&year=${year}`;
    return this.fileService.downloadFile(url);
  }

  buildGradesJournalCoursesDocx(year: number, degreeId: number): any {
    const url = `${this.documentsUrl}/grades-journal/courses/docx?degreeId=${degreeId}&year=${year}`;
    return this.fileService.downloadFile(url);
  }

  buildStudentsList(year: number, degreeId: number, tuitionForm: string): any {
    const url = `${this.documentsUrl}/student-list/year/${year}/degree/${degreeId}?tuitionForm=${tuitionForm}`;
    return this.fileService.downloadFile(url);
  }

  makeSingleStudentAndCourseExamReport(studentDegreeIds: Array<number>, courseIds: Array<number>) {
    const url = environment.apiUrl + `/documents/single-student-and-course-exam-report`;
    const myHeaders = new HttpHeaders();
    myHeaders.append('content-filename', 'file');

    const params = new HttpParams().set('student_ids', studentDegreeIds.toString()).set('course_ids', courseIds.toString());
    const response = this.http.get(url, { responseType: 'blob', observe: 'response', headers: myHeaders, params });
    response.subscribe((res: any) => {
      saveAs(res.body, res.headers.get('content-filename'));
    });
    return response
  }
}
