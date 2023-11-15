import { Component, OnInit } from '@angular/core';
import {StudentGroup} from "../../models/StudentGroup";
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'courses-for-students',
  templateUrl: './courses-for-students.component.html',
  styleUrls: ['./courses-for-students.component.scss']
})
export class CoursesForStudentsComponent implements OnInit {
  groups: StudentGroup[];
  selectedGroup: StudentGroup;
  selectedSemester: number;
  showPage = false;
  searchText = '';
  semesters: number[] = [];

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.groupService.getGroups().subscribe(groups => {
      this.groups = groups;
      this.showPage = true;
    });
  }

  private changeSemesters() {
    this.semesters = [];
    for (let i = 0; i < this.selectedGroup.studySemesters; i++) {
      this.semesters.push(i + this.selectedGroup.beginYears * 2 - 1);
    }
    if (!this.semesters.includes(this.selectedSemester)) {
      this.selectedSemester = this.semesters[0];
    }
  }

  onSemesterChange() {
    // this.loadCoursesBySemester();
    // this.getCoursesForGroup();
    // this.courseCreationChild.form.controls.semester.setValue(this.selectedSemester);
  }

  onGroupChange() {
    // this.changeSemesters();
    // this.refresh();
    // if (this.selectedSemester) {
    //   this.onSemesterChange();
    // }
  }
}
