import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {FileService} from './file-service';
import {catchError} from "rxjs/operators";
import {forObservable} from "../components/shared/httpErrors";
import {Grade} from "../models/Grade";

@Injectable()
export class ExamReportService {
  private documentsUrl = `${environment.apiUrl}/documents`;

  constructor(private fileService: FileService) { }

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

  makeSingleStudentAndCourseExamReport(grade: Grade) {
    const url = `${this.documentsUrl}/single-student-and-course-exam-report?student_ids=${grade.studentDegreeId}&course_ids=${grade.courseId}`;
    return this.fileService.downloadFile(url).pipe(catchError(forObservable('Формування бігунка', [])));
  }
}
