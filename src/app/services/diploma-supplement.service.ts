import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class DiplomaSupplementService {
  private documentsUrl = `${environment.apiUrl}/documents`;

  buildDiplomaSupplement(studentId: string): void {
    const url = `${this.documentsUrl}/supplements/degrees/${studentId}/docx`;
    window.open(url, '_blank');
  }

  buildGradePercent(groupId: string): void {
    const url = `${this.documentsUrl}/percentagereport/groups/${groupId}/docx`;
    window.open(url, '_blank');
  }
}
