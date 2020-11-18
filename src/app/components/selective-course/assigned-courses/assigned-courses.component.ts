import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourseForGroup} from '../../../models/CourseForGroup';
import {StudentGroup} from '../../../models/StudentGroup';
import {BsModalService} from 'ngx-bootstrap/modal';
import {SelectiveCourse} from '../../../models/SelectiveCourse';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {TypeCycle} from '../../../models/TypeCycle';

@Component({
  selector: 'assigned-courses',
  templateUrl: './assigned-courses.component.html',
  styleUrls: ['./assigned-courses.component.scss']
})
export class AssignedCoursesComponent implements OnInit {
  @Input() studyYear: string;
  @Input() degreeId: number;
  @Input() semester: number;
  @Output() onSelectedAssignedCoursesChange = new EventEmitter();
  @Input() showEditButton = true;

  typeCycle = TypeCycle;

  allRowsIsSelected = false;

  selectiveCourses = [];
  selectedAssignedCourses = [];

  constructor(private selectiveCourseService: SelectiveCourseService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    if (this.studyYear && this.degreeId && this.semester) {
      this.selectiveCourseService.getSelectiveCourses(this.studyYear, this.degreeId, this.semester)
        .subscribe((selectiveCourses: SelectiveCourse[]) => {
          this.selectiveCourses = selectiveCourses;
        });

      this.selectedAssignedCourses = [];
      this.onSelectedAssignedCoursesChange.emit(this.selectedAssignedCourses);
    }
  }

  getCoursesForGroup(selectedGroup: StudentGroup, selectedSemester: number, academicDifference: boolean) {
    /*this.courseForGroupService.getCoursesForGroupAndSemester(selectedGroup.id, selectedSemester).subscribe(courses => {
      this.loadedCoursesForGroup = courses;
      this.filterByAcademicDifference(academicDifference);
    });*/
  }

  filterByAcademicDifference(academicDifference: boolean) {
    /*this.coursesForGroup = this.loadedCoursesForGroup.filter(cfg => !(cfg.academicDifference && !academicDifference));
    this.onCoursesForGroup.emit(this.coursesForGroup);*/
  }

  changeAllIsSelected(isSelected: boolean): void {
    this.selectiveCourses.forEach(item => this.changeSelectedAssignedCourses(isSelected, item));
    this.allRowsIsSelected = isSelected;
  }

  changeSelectedAssignedCourses(checked: boolean, selectedCourse: SelectiveCourse) {
    const i = this.selectedAssignedCourses.findIndex(item => item.id === selectedCourse.id);

    if (checked) {
      if (i === -1) {
        this.selectedAssignedCourses.push(selectedCourse);
      }
    } else {
      if (i !== -1) {
        this.selectedAssignedCourses.splice(i, 1);
      }
    }

    this.onSelectedAssignedCoursesChange.emit(this.selectedAssignedCourses);
  }

  changeTeacher(course) {
    // this.onTeacherChange.emit(course);
  }

  changeCourse(course) {
    /*const initialState = {
      courseFromTable: course,
      selectedGroup: this.selectedGroup
    };
    this.modalService.show(EditDialogComponent, {initialState});*/
  }
}
