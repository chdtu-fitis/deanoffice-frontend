import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';

import {CourseForGroup} from '../../../models/CourseForGroup';
import {StudentGroup} from '../../../models/StudentGroup';
import {CourseForGroupService} from '../../../services/course-for-group.service';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'added-courses',
  templateUrl: './added-courses.component.html',
  styleUrls: ['./added-courses.component.scss'],
  providers: [CourseForGroupService]
})
export class AddedCoursesComponent implements OnInit {

  loadedCoursesForGroup: CourseForGroup[] = [];
  coursesForGroup: CourseForGroup[] = [];
  coursesForGroupForDelete: CourseForGroup[] = [];
  @Input() selectedGroup: StudentGroup;
  @Input() selectedSemester: number;
  @Input() changesExistence: boolean;
  @Output() onCoursesForDeleteChange = new EventEmitter();
  @Output() onCoursesForGroup = new EventEmitter();
  @Output() onTeacherChange = new EventEmitter();
  @Output() onDateChange = new EventEmitter();
  @Output() academicDifferenceChange = new EventEmitter();
  allRowsIsSelected = false;

  constructor(private courseForGroupService: CourseForGroupService,
              private modalService: BsModalService) { }

  ngOnInit() {}

  getCoursesForGroup(selectedGroup: StudentGroup, selectedSemester: number, academicDifference: boolean) {
    this.courseForGroupService.getCoursesForGroupAndSemester(selectedGroup.id, selectedSemester).subscribe(courses => {
      this.loadedCoursesForGroup = courses;
      this.filterByAcademicDifference(academicDifference);
    });
  }

  filterByAcademicDifference(academicDifference: boolean) {
    this.coursesForGroup = this.loadedCoursesForGroup.filter(cfg => !(cfg.academicDifference && !academicDifference));
    this.onCoursesForGroup.emit(this.coursesForGroup);
  }

  changeAllIsSelected(isSelected: boolean): void {
    this.coursesForGroup.forEach((item) => this.changeCoursesForDelete(isSelected, item));
    this.allRowsIsSelected = isSelected;
  }

  changeCoursesForDelete(checked: boolean, selectedCourse: CourseForGroup) {
    if (!checked) {
      for (const course of this.coursesForGroupForDelete) {
        if (course.id === selectedCourse.id) {
          this.coursesForGroupForDelete.splice(this.coursesForGroupForDelete.indexOf(course), 1);
        }
      }
    } else {
      this.coursesForGroupForDelete.push(selectedCourse);
    }
    this.onCoursesForDeleteChange.emit(this.coursesForGroupForDelete);
  }

  changeTeacher(course) {
    this.onTeacherChange.emit(course);
  }

  dateChange(course) {
    this.onDateChange.emit(course);
  }

  onAcademicDifferenceChange(course) {
    this.academicDifferenceChange.emit(course);
  }

  changeCourse(course) {
    const initialState = {
      courseFromTable: course,
      selectedGroup: this.selectedGroup
    };
    this.modalService.show(EditDialogComponent, {initialState});
  }
}
