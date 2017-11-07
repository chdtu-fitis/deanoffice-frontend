import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CourseForGroup} from "../model/entity/CourseForGroup";
import {StudentGroup} from "../model/entity/StudentGroup";
import {Teacher} from "../model/entity/Teacher";

@Injectable()
export class CoursesForGroupsService {

  groups = [
    {name: 'k;fdnd'},
    {name: 'dsgsdg'}
  ];

  constructor(private http: HttpClient) { }

  getCoursesBySpecialization(specializationId){
    return this.http.get<CourseForGroup[]>(`/coursesforgroups/${specializationId}/courses`).toPromise();
  }

  setCoursesForGroup(body, groupId){
    return this.http.post(`/coursesforgroups/${groupId}/courses`, body).toPromise();
  }

  getGroups(){
    return this.http.get<StudentGroup[]>('/coursesforgroups/groups').toPromise();
  }


  getTeachers() {
    return this.http.get<Teacher[]>('/coursesforgroups/teachers').toPromise();
  }


}
