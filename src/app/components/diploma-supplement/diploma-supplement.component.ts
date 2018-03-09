import {Component, OnInit} from '@angular/core';
import {Degree} from '../../models/Degree';
import {DegreeService} from '../../services/degree.service';
import {GroupService} from '../../services/group.service';
import {StudentGroup} from '../../models/StudentGroup';
import {StudentService} from '../../services/student.service';
import {StudentDegree} from '../../models/StudentDegree';
import {DiplomaSupplementService} from "../../services/diploma-supplement.service";

@Component({
  selector: 'diploma-supplement',
  templateUrl: './diploma-supplement.component.html',
  styleUrls: ['./diploma-supplement.component.scss']
})
export class DiplomaSupplementComponent implements OnInit {
  degrees: Degree[];
  groups: StudentGroup[];
  students: StudentDegree[];
  studentsSelected: boolean;
  message: string;

  constructor(private degreeService: DegreeService, private groupService: GroupService,
              private studentService: StudentService, private diplomaSupplementService: DiplomaSupplementService) {
  }

  ngOnInit() {
    this.degreeService.getDegrees()
      .subscribe(degrees => {
        this.degrees = degrees;
        this.onDegreeChange('1');
      });
  }

  onDegreeChange(degreeId: string): void {
    this.groupService.getGroupsByDegree(degreeId)
      .subscribe(groups => {
        this.groups = groups;
        this.onGroupChange(this.groups[0].id.toString());
      });
  }

  onGroupChange(groupId: string): void {
    this.students = this.groups.find(x => x.id == Number(groupId)).studentDegrees;
    for (var student of this.students) {student.selected = true;}
    this.studentsSelected = true;
  }

  onSelectAllStudents(checked: boolean): void {
    for (var student of this.students) {
      student.selected = checked;
    }
  }

  onFormSupplement(): void {
    this.message = "";
    for (var student of this.students) {
      if (student.selected){
        this.diplomaSupplementService.buildDiplomaSupplement(""+student.id);
      }
    }
  }
}
