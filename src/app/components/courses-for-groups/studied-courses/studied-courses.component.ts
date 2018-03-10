import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StudentGroup} from "../../../models/StudentGroup";
import {GroupService} from "../../../services/group.service";
import {CourseForGroup} from "../../../models/CourseForGroup";
import {Course} from "../../../models/Course";

@Component({
  selector: 'studied-courses',
  templateUrl: './studied-courses.component.html',
  styleUrls: ['./studied-courses.component.scss'],
  providers: [GroupService]
})
export class StudiedCoursesComponent implements OnInit {

  groups: StudentGroup[];
  selectedGroup: StudentGroup;
  selectedSemester: number;
  semesters: number[];
  courses: Course[];

  @Output() selectGroup = new EventEmitter();
  @Output() selectSemester = new EventEmitter();

  constructor(private groupService: GroupService) {
  }

  ngOnInit() {
    this.groupService.getGroupsByFaculty().subscribe(groups => {
      this.groups = groups;
    })
  }

  changeSemesters(){
    for (let i = 0; i < this.selectedGroup.studySemesters; i++){
      this.semesters.push(i + 1);
    }
  }

}
