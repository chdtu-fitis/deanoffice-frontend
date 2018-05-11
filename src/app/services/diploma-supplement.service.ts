import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {FileService} from './file-service';

@Injectable()
export class DiplomaSupplementService {
  private documentsUrl = `${environment.apiUrl}/documents`;

  constructor(private fileService: FileService) {
  }

  buildDiplomaSupplement(studentId: string): any {
    const url = `${this.documentsUrl}/supplements/degrees/${studentId}/docx`;
    return this.fileService.downloadFile(url)
  }

  buildGradePercent(groupId: string): any {
    const url = `${this.documentsUrl}/percentagereport/groups/${groupId}/docx`;
    return this.fileService.downloadFile(url)
  }

  buildFullGradesTableReport(groupId: string): any {
    const url = `${this.documentsUrl}/grouptablereport/groups/${groupId}`;
    return this.fileService.downloadFile(url)
  }
}
