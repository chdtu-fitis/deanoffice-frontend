import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class ExamReportService {
  private documentsUrl = `${environment.apiUrl}/documents`;

  constructor() { }

  buildExamReport(groupId: number, courseId: number): void {
      const url = `${this.documentsUrl}/exam-report/groups/${groupId}/courses/${courseId}/docx`;
      window.open(url, '_blank');
  }
}
