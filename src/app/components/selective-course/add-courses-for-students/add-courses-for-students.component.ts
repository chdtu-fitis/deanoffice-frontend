import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {GroupService} from '../../../services/group.service';
import {StudentGroup} from '../../../models/StudentGroup';
import {Degree} from '../../../models/Degree';
import {StudentDegree} from '../../../models/StudentDegree';
import {SelectiveCourse} from '../../../models/SelectiveCourse';
import {DegreeService} from '../../../services/degree.service';
import {TypeCycle} from '../../../models/TypeCycle';

@Component({
  selector: 'add-courses-for-students',
  templateUrl: './add-courses-for-students.component.html',
  styleUrls: ['./add-courses-for-students.component.scss']
})

export class AddCoursesForStudentsComponent implements OnInit {
  degrees: Degree[] = [];
  currentDegree: Degree;
  groups: StudentGroup[];
  currentGroup: StudentGroup;
  currentGroupName: string;
  students: StudentDegree[];
  selectedYear: string;
  selectiveCourses: SelectiveCourse[];
  years: number[];
  currentYear: number = 2;
  typeCycle = TypeCycle;
  searchText: string;
  selectedCourses: SelectiveCourse[] = [];
  selectedStudents: StudentDegree[] = [];

  constructor(public bsModalRef: BsModalRef, private groupService: GroupService,
              private degreeService: DegreeService, private selectiveCourseService: SelectiveCourseService) {}

  ngOnInit() {
    this.years = [1, 2, 3, 4, 5, 6];
    this.degreeService.getDegrees().subscribe(degrees => {
        this.degrees = degrees;
        if (this.degrees) {
          this.currentDegree = this.degrees[0];
          this.onDegreeOrYearChange();
          this.selectiveCourseService.getSelectiveCourses(this.selectedYear, this.currentDegree.id, this.currentYear * 2 - 1, false)
            .subscribe(selectiveCourses => {
              this.selectiveCourses = selectiveCourses;
            });
        }
      });
  }

  onDegreeOrYearChange(): void {
    this.groupService.getGroupsByDegreeAndRealYear(this.currentDegree.id, this.currentYear)
      .subscribe(groups => {
        this.groups = groups ? groups : [];
        this.currentGroup = groups[0];
        if (this.groups && this.groups.length) {
          this.onGroupChange();
        } else {
          this.students = [];
          this.currentGroupName = '';
        }
      });
    this.selectiveCourseService.getSelectiveCourses(this.selectedYear, this.currentDegree.id, this.currentYear * 2 - 1, false)
      .subscribe(selectiveCourses => {
        this.selectiveCourses = selectiveCourses;
        this.selectiveCourseService.getSelectiveCourses(this.selectedYear, this.currentDegree.id, this.currentYear * 2, false)
          .subscribe(selectiveCourses2 => {
            this.selectiveCourses.push(...selectiveCourses2);
          });
      });
  }

  onGroupChange() {
    this.students = this.currentGroup.studentDegrees;
    this.currentGroupName = this.currentGroup.name;
  }

  changeSelectedCourses(checked: boolean, selectedCourse: SelectiveCourse) {
    if (!checked) {
      for (const course of this.selectedCourses) {
        if (course.id === selectedCourse.id) {
          this.selectedCourses.splice(this.selectedCourses.indexOf(course), 1);
        }
      }
    } else {
      this.selectedCourses.push(selectedCourse);
    }
  }

  isSelectedCourseEmpty() {
      return this.selectedCourses.length;
  }

  isSelectedStudentsEmpty() {
    return this.selectedStudents.length;
  }

  changeSelectedStudents(checked: boolean, selectedStudent: StudentDegree) {
    if (!checked) {
      for (const student of this.selectedStudents) {
        if (student.id === selectedStudent.id) {
          this.selectedStudents.splice(this.selectedStudents.indexOf(student), 1);
        }
      }
    } else {
      selectedStudent.groupName = this.currentGroupName;
      this.selectedStudents.push(selectedStudent);
    }
  }

  saveCoursesForStudents() {
    const body = {
      selectiveCourses: this.selectedCourses.map(selectedCourse => selectedCourse.id),
      studentDegrees: this.selectedStudents.map(selectedStudent => selectedStudent.id),
      studyYear: +this.selectedYear
    }
    this.selectiveCourseService.assignMultipleCoursesForMultipleStudents(body).subscribe((response: any) => {
      this.selectedStudents = [];
      this.disableStudentCheckboxes();
      alert(response.message)
    }, error => {
      console.log(body, error);
    });
  }

  disableStudentCheckboxes() {
    this.students.forEach(student => student.selected = false);
  }
}
