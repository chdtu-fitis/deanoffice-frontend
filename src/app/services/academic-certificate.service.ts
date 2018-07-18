import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {FileService} from "./file-service";

@Injectable()
export class AcademicCertificateService {
  private documentsUrl = `${environment.apiUrl}/documents`;

  constructor(private fileService: FileService) {
  }

  buildAcademicCertificate(studentDegreeId: number): any {
    const url = `${this.documentsUrl}/academic-certificate/${studentDegreeId}`;
    return this.fileService.downloadFile(url);
  }
}
