import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Injectable()
export class FileService {
  constructor(private http: HttpClient) {
  }

  public downloadFile(url: string) {
    let myHeaders = new HttpHeaders();
    myHeaders.append('content-filename', 'file');

    let response = this.http.get(url, {
      responseType: 'blob',
      observe: 'response',
      headers: myHeaders 
    });
    response.subscribe((res: any) => {
      saveAs(res.body, res.headers.get('content-filename'));
    });
    return response;
  }

}
