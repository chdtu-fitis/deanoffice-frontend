import {Component, Input, OnInit} from '@angular/core';
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

  typeCycle = TypeCycle;

  allRowsIsSelected = false;

  selectiveCourses: SelectiveCourse[];

  constructor(private selectiveCourseService: SelectiveCourseService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    if (this.studyYear && this.degreeId && this.semester) {
      this.selectiveCourseService.getSelectiveCourses(this.studyYear, this.degreeId, this.semester)
        .subscribe((selectiveCourses: SelectiveCourse[]) => {
          this.selectiveCourses = selectiveCourses;
        });
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
    // this.coursesForGroup.forEach((item) => this.changeCoursesForDelete(isSelected, item));
    this.allRowsIsSelected = isSelected;
  }

  changeCoursesForDelete(checked: boolean, selectedCourse: CourseForGroup) {
    /*if (!checked) {
      for (const course of this.coursesForGroupForDelete) {
        if (course.id === selectedCourse.id) {
          this.coursesForGroupForDelete.splice(this.coursesForGroupForDelete.indexOf(course), 1);
        }
      }
    } else {
      this.coursesForGroupForDelete.push(selectedCourse);
    }
    this.onCoursesForDeleteChange.emit(this.coursesForGroupForDelete);*/
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
