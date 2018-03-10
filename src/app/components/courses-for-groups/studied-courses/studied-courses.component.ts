import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StudentGroup} from "../../../models/StudentGroup";

@Component({
  selector: 'studied-courses',
  templateUrl: './studied-courses.component.html',
  styleUrls: ['./studied-courses.component.scss']
})
export class StudiedCoursesComponent implements OnInit {

  groups: StudentGroup[];
  selectedGroup: StudentGroup;
  selectedSemester: number;
  semesters: number[];

  @Output() selectGroup = new EventEmitter();
  @Output() selectSemester = new EventEmitter();

  constructor() {
  }

  ngOnInit() {

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
