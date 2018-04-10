import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TeacherService {
  constructor(private http: HttpClient) {
  }
}
