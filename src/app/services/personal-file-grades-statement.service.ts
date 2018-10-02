import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {FileService} from './file-service';

@Injectable()
export class PersonalFileGradesStatementService {
  private documentsUrl = `${environment.apiUrl}/documents`;

  constructor(private fileService: FileService) { }

  buildPersonalFileGradesStatement(year: number, studentIds: number[]): any {
    const url = `${this.documentsUrl}/personal-file-grades-statement/${year}/docx?studentIds=${studentIds}`;
    return this.fileService.downloadFile(url);
  }
}
