import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseForGroup } from '../../../models/CourseForGroup';
import { StudentGroup } from '../../../models/StudentGroup';
import { CourseForGroupService } from '../../../services/course-for-group.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'added-courses',
  templateUrl: './added-courses.component.html',
  styleUrls: [ './added-courses.component.scss' ],
  providers: [ CourseForGroupService ]
})
export class AddedCoursesComponent implements OnInit {

  coursesForGroup: CourseForGroup[] = [];
  coursesForGroupForDelete: CourseForGroup[] = [];
  @Input() selectedGroup: StudentGroup;
  @Input() selectedSemester: number;
  @Input() changesExistence: boolean;
  @Output() onCoursesForDeleteChange = new EventEmitter();
  @Output() onCoursesForGroup = new EventEmitter();
  @Output() onTeacherChange = new EventEmitter();
  @Output() onDateChange = new EventEmitter();
  allRowsIsSelected = false;

  constructor(private courseForGroupService: CourseForGroupService,
              private modalService: NgbModal) { }

  ngOnInit() {}

  getCoursesForGroup() {
    this.courseForGroupService.getCoursesForGroupAndSemester(this.selectedGroup.id, this.selectedSemester).subscribe(courses => {
      this.coursesForGroup = courses;
      this.onCoursesForGroup.emit(this.coursesForGroup);
    });
  }

  changeAllIsSelected(isSelected: boolean): void {
    this.coursesForGroup.forEach((item) => this.changeCoursesForDelete(isSelected, item));
    this.allRowsIsSelected = isSelected;
  }

  changeCoursesForDelete(checked: boolean, selectedCourse: CourseForGroup){
    if (!checked) {
      for (let course of this.coursesForGroupForDelete)
        if (course.id === selectedCourse.id) {
          this.coursesForGroupForDelete.splice(this.coursesForGroupForDelete.indexOf(course), 1);
        }
    }
    else {
      this.coursesForGroupForDelete.push(selectedCourse);
    }
    this.onCoursesForDeleteChange.emit(this.coursesForGroupForDelete);
  }

  changeTeacher(course){
    this.onTeacherChange.emit(course);
  }

  dateChange(index){
    this.onDateChange.emit({ index: index });
  }

  changeCourse(course) {
    const modalRef = this.modalService.open(EditDialogComponent, {
      centered: true,
      size: 'lg' 
    });
    modalRef.componentInstance.course = JSON.parse(JSON.stringify(course));
    modalRef.componentInstance.courseFromTable = course;
    modalRef.componentInstance.selectedGroup = this.selectedGroup;
  }
}
