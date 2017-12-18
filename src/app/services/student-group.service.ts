import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentGroup} from '../model/StudentGroup';

@Injectable()
export class StudentGroupService {

    constructor(private http: HttpClient) {
    }

    getGroups() {
        return this.http.get<StudentGroup>('/coursesforgroups/groups').toPromise();
    }

}
