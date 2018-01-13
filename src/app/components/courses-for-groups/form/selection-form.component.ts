import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CourseForGroup} from '../../../models/CourseForGroup';
import {CoursesForGroupsService} from '../courses-for-groups.service';
import {StudentGroup} from '../../../models/StudentGroup';

@Component({
  selector: 'selection-form',
  templateUrl: './selection-form.component.html',
  styleUrls: ['./selection-form.component.scss'],
  providers: [CoursesForGroupsService]
})
export class SelectionFormComponent implements OnInit {
  groups: StudentGroup[];
  selectedGroup: StudentGroup;
  selectedSemester: number;
  semesters: number[];

  @Output() selectGroup = new EventEmitter();
  @Output() selectSemester = new EventEmitter();



  constructor(private coursesForGroupsService: CoursesForGroupsService) {
  }

  ngOnInit() {
    this.coursesForGroupsService.getGroups().then(groups => this.groups = groups);
  }

  changeSelectedGroup(group: StudentGroup){
    this.selectedGroup = group;
    this.changeSemesters(group);
    this.selectGroup.emit(this.selectedGroup);
  }

   private changeSemesters(group: StudentGroup){
    for (let i = 0; i < group.studySemesters; i++){
      this.semesters.push(i + 1);
    }
  }

  changeSelectedSemester(semester: number){
     this.selectedSemester = semester;
     this.selectSemester.emit(semester);
  }
}
