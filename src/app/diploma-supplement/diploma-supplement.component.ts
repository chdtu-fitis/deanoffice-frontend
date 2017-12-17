import { Component, OnInit } from '@angular/core';
import {Degree} from "../model/entity/Degree";
import {DegreeService} from "../model/service/degree.service";
import {GroupService} from "../model/service/group.service";
import {StudentGroup} from "../model/entity/StudentGroup";
import {StudentService} from "../model/service/student.service";
import {Student} from "../model/entity/Student";

@Component({
  selector: 'diploma-supplement',
  templateUrl: './diploma-supplement.component.html',
  styleUrls: ['./diploma-supplement.component.scss']
})
export class DiplomaSupplementComponent implements OnInit {
  degrees: Degree[];
  groups: StudentGroup[];
  students: Student[];

  constructor(private degreeService: DegreeService, private groupService: GroupService, private studentService: StudentService) { }

  ngOnInit() {
    this.degreeService.getDegrees()
      .subscribe(degrees => this.degrees = degrees);
    this.groupService.getGroupsByDegree('1')
      .subscribe(groups => this.groups = groups);
  }

  onDegreeChange(degreeId: string): void {
    this.groupService.getGroupsByDegree(degreeId)
      .subscribe(groups => this.groups = groups);
  }

  onGroupChange(groupId: string): void {
    this.groupService.getGroupStudents(groupId)
      .subscribe(students => this.students = students);
  }
}
