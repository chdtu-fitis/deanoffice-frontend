import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {FileService} from './file-service';

@Injectable()
export class PersonalFileGradesStatementService {
  private documentsUrl = `${environment.apiUrl}/documents`;

  constructor(private fileService: FileService) { }

  buildPersonalFileGradesStatement(year: number, studentIds: number[]): any {
    const url = `${this.documentsUrl}/personal-file-grades-statement/${year}/docx?studentDegreeIds=${studentIds}`;
    return this.fileService.downloadFile(url);
  }

  buildPersonalFileFrontPage(studentIds: number[]): any {
    const url = `${this.documentsUrl}/personal-file-grades-statement/front/docx?studentDegreeIds=${studentIds}`;
    return this.fileService.downloadFile(url);
  }

  buildPersonalFileBackPage(studentIds: number[]): any {
    const url = `${this.documentsUrl}/personal-file-grades-statement/back/docx?studentDegreeIds=${studentIds}`;
    return this.fileService.downloadFile(url);
  }

  buildIndividualCurriculum(year: number, studentIds: number[]): any {
    const url = `${this.documentsUrl}/individual-curriculum/${year}/docx?studentDegreeIds=${studentIds}`;
    return this.fileService.downloadFile(url);
  }
}
