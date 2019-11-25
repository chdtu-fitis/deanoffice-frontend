import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {FileService} from "./file-service";

@Injectable()
export class AcademicCertificateService {
  private documentsUrl = `${environment.apiUrl}/documents`;

  constructor(private fileService: FileService) {
  }

  buildAcademicCertificate(studentExpelId: number): any {
    const url = `${this.documentsUrl}/academic-certificate/${studentExpelId}`;
    return this.fileService.downloadFile(url);
  }

  buildAbstractOfScholasticRecords(studentDegreeId: number): any {
    const url = `${this.documentsUrl}/abstract-scholastic-records/${studentDegreeId}`;
    return this.fileService.downloadFile(url);
  }
}
