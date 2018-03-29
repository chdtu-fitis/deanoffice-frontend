import {Component, OnInit, Input} from '@angular/core';
import {CourseForGroup} from '../../../models/CourseForGroup';
import {StudentGroup} from '../../../models/StudentGroup';
import {CourseForGroupService} from '../../../services/course-for-group.service';
import {Course} from '../../../models/Course';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'added-courses',
  templateUrl: './added-courses.component.html',
  styleUrls: ['./added-courses.component.scss'],
  providers: [CourseForGroupService]
})
export class AddedCoursesComponent implements OnInit {

  coursesForGroup: CourseForGroup[];
  @Input() selectedCoursesForGroups: CourseForGroup[];
  @Input() selectedGroup: StudentGroup;
  @Input() selectedSemester: number;

  constructor(private courseForGroupService: CourseForGroupService) { }

  ngOnInit() {}

  getCoursesForGroup() {
    this.courseForGroupService.getCoursesForGroupsBySemesterAndGroup(this.selectedSemester, this.selectedGroup).subscribe(courses => {
      this.coursesForGroup = courses;
    })
    console.log(this.coursesForGroup);
  }
}
