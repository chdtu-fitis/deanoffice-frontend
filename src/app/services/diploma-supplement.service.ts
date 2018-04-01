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
    const url = `${this.documentsUrl}/percentagereport/groups/${groupId}/pdf`;
    return this.fileService.downloadFile(url)
  }
}
