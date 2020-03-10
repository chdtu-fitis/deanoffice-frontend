import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {FileService} from './file-service';
import {GradeRunners} from '../components/grade/grade-runner/models/GradeRunners';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

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

  buildStudentsAndCoursesReport(gradeRunners: GradeRunners[]): Observable<HttpResponse<Blob>> {
    const studentsCourses = gradeRunners.map(gradeRunner => {
      const courses = gradeRunner.courses.map(course => course.id);

      return {
        studentDegreeId: gradeRunner.student.studentDegreeId,
        courses,
      };
    });

    const studentsCoursesJSON = JSON.stringify(studentsCourses);

    const url = `${this.documentsUrl}/single-student-and-course-exam-report?studentsCoursesJson=${studentsCoursesJSON}`;

    return this.fileService.downloadFile(url);
  }
}
