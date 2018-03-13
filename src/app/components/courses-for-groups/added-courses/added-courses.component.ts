import {Component, OnInit, Input} from '@angular/core';
import {CourseForGroup} from '../../../models/CourseForGroup';
import {StudentGroup} from '../../../models/StudentGroup';

@Component({
  selector: 'added-courses',
  templateUrl: './added-courses.component.html',
  styleUrls: ['./added-courses.component.scss']
})
export class AddedCoursesComponent implements OnInit {

  coursesForGroup: CourseForGroup[];
  @Input() addedCoursesForGroup: CourseForGroup[];
  @Input() selectedGroup: StudentGroup;
  @Input() selectedSemester: number;

  constructor() { }

  ngOnInit() {
  }

  onSemesterChange() {
    if (this.selectedSemester) {
      this.courseForGroupService.getCoursesBySemesterAndGroupID(this.selectedGroup.id, this.selectedSemester).subscribe(cfg => {
        this.coursesForGroup = cfg;
      })
    }
  }
  onGroupChange() {
    this.onSemesterChange();
  }
  onCoursesForGroupChange() {
    this.coursesForGroup = this.coursesForGroup.concat(this.addedCoursesForGroup);
  }
}
