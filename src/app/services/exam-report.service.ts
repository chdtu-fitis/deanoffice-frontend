import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {FileService} from "./file-service";

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

  buildGradesJournalStudentsPdf(year: number, degreeId: number): any {
    const url = `${this.documentsUrl}/grades-journal/students?degreeId=${degreeId}&year=${year}`;
    return this.fileService.downloadFile(url);
  }

  buildGradesJournalCoursesPdf(year: number, degreeId: number): any {
    const url = `${this.documentsUrl}/grades-journal/courses?degreeId=${degreeId}&year=${year}`;
    return this.fileService.downloadFile(url);
  }
}
