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
import {FacultyService} from '../../../services/faculty.service';
import {Faculty} from '../../../models/Faculty';

@Component({
  selector: 'add-courses-for-students',
  templateUrl: './add-courses-for-students.component.html',
  styleUrls: ['./add-courses-for-students.component.scss']
})

export class AddCoursesForStudentsComponent implements OnInit {
  degrees: Degree[] = [];
  currentDegree: Degree;
  groups: StudentGroup[];
  filteredGroups: StudentGroup[] = [];
  faculties: Faculty[];
  currentFaculty: Faculty;
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
  isAllSelected = false;

  constructor(public bsModalRef: BsModalRef, private groupService: GroupService,
              private degreeService: DegreeService, private selectiveCourseService: SelectiveCourseService,
              private facultyService: FacultyService) {}

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
    this.facultyService.getFaculties().subscribe((faculties: Faculty[]) => {
      this.faculties = faculties;
      const allFaculty = new Faculty();
      allFaculty.id = 0;
      allFaculty.abbr = "Всі";
      this.faculties.unshift(allFaculty);
      this.currentFaculty = this.faculties[0];
    });
  }

  onDegreeOrYearChange(): void {
    this.groupService.getGroupsByDegreeAndRealYear(this.currentDegree.id, this.currentYear)
      .subscribe(groups => {
        this.groups = groups ? groups : [];
        this.filteredGroups = groups ? groups : [];
        this.currentGroup = groups[0];
        this.selectedStudents = [];
        this.selectedCourses = [];
        if (this.groups && this.groups.length) {
          this.onGroupChange();
          this.onFacultyChange();
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

  onFacultyChange() {
    this.filteredGroups = [];
    if (this.currentFaculty.id === 0) {
      this.filteredGroups = this.groups;
    } else {
      for (let i = 0; i < this.groups.length; i++) {
        if (this.currentFaculty.id == this.groups[i].specialization.facultyId) {
          if (this.groups[i]) {
            this.filteredGroups.push(this.groups[i]);
          }
        }
      }
      if (this.filteredGroups.length === 0) {
        this.students = [];
      } else {
        this.currentGroup = this.filteredGroups[0];
        this.students = this.currentGroup.studentDegrees;
      }
    }
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
    this.isAllSelected = this.selectedCourses.length > 0;
  }

  changeAllIsSelected(): void {
    if (this.selectedCourses.length > 0) {
      this.selectiveCourses.forEach(item => item.selected = this.isAllSelected);
      this.selectedCourses = this.isAllSelected ? this.selectiveCourses.slice() : [];
    } else {
      this.isAllSelected = false;
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
      this.disableStudentCheckboxes();
      this.selectedStudents = [];
      alert(response.message)
    }, error => {
      alert(error.message);
    });
  }

  disableStudentCheckboxes() {
    this.selectedStudents.forEach(student => student.selected = false);
  }
}
