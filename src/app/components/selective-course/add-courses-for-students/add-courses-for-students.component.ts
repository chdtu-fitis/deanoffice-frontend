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
import {FieldOfKnowledgeService} from '../../../services/field-of-knowledge.service';
import {Faculty} from '../../../models/Faculty';
import {FieldOfKnowledge} from '../../../models/FieldOfKnowledge';

const ALL_COURSES = 0, GENERAL_ONLY = -1;

@Component({
  selector: 'add-courses-for-students',
  templateUrl: './add-courses-for-students.component.html',
  styleUrls: ['./add-courses-for-students.component.scss']
})

export class AddCoursesForStudentsComponent implements OnInit {
  degrees: Degree[] = [];
  currentDegree: Degree;
  groups: StudentGroup[] = [];
  allGroups: StudentGroup;
  filteredGroups: StudentGroup[] = [];
  faculties: Faculty[];
  currentFaculty: Faculty;
  currentGroup: StudentGroup;
  currentGroupName: string;
  students: StudentDegree[];
  selectedYear: string;
  filteredSelectiveCourses: SelectiveCourse[] = [];
  selectiveCourses: SelectiveCourse[] = [];
  years: number[];
  currentYear: number = 2;
  typeCycle = TypeCycle;
  searchText: string;
  selectedCourses: SelectiveCourse[] = [];
  selectedStudents: StudentDegree[] = [];
  isAllCoursesSelected = false;
  isAllStudentsSelected = false;
  searchTextForStudents: string;
  fieldsOfKnowledge: FieldOfKnowledge[];
  currentFieldOfKnowledge: FieldOfKnowledge;

  constructor(public bsModalRef: BsModalRef, private groupService: GroupService,
              private degreeService: DegreeService, private selectiveCourseService: SelectiveCourseService,
              private fieldOfKnowledgeService: FieldOfKnowledgeService,
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
              this.filteredSelectiveCourses = selectiveCourses;
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
    this.fieldOfKnowledgeService.getFieldsOfKnowledge().subscribe(fieldsOfKnowledge => {
      this.fieldsOfKnowledge = fieldsOfKnowledge;
      const allFieldsOfKnowledge = new FieldOfKnowledge();
      allFieldsOfKnowledge.id = ALL_COURSES;
      allFieldsOfKnowledge.name = "Всі";
      allFieldsOfKnowledge.code = "00";
      const generalFieldsOfKnowledge = new FieldOfKnowledge();
      generalFieldsOfKnowledge.id = GENERAL_ONLY;
      generalFieldsOfKnowledge.name = "Загальні";
      generalFieldsOfKnowledge.code = "00";
      this.fieldsOfKnowledge.unshift(generalFieldsOfKnowledge);
      this.fieldsOfKnowledge.unshift(allFieldsOfKnowledge);
      this.currentFieldOfKnowledge = this.fieldsOfKnowledge[0];
    });
  }

  onDegreeOrYearChange(): void {
    this.groupService.getGroupsByDegreeAndRealYear(this.currentDegree.id, this.currentYear)
      .subscribe(groups => {
        this.groups = groups ? groups : [];
        this.allGroups = new StudentGroup();
        this.allGroups.name = "Всі";
        this.allGroups.id = 0;
        this.allGroups.studentDegrees = [];
        for (let i = 0; i < this.groups.length; i++) {
          this.allGroups.studentDegrees.push(...this.groups[i].studentDegrees);
        }
        this.groups.unshift(this.allGroups);
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
        this.filteredSelectiveCourses = selectiveCourses;
        this.selectiveCourses = selectiveCourses;
        this.selectiveCourseService.getSelectiveCourses(this.selectedYear, this.currentDegree.id, this.currentYear * 2, false)
          .subscribe(selectiveCourses2 => {
            this.filteredSelectiveCourses.push(...selectiveCourses2);
            this.selectiveCourses.push(...selectiveCourses2);
          });
      });
  }

  onGroupChange() {
    this.students = this.currentGroup.studentDegrees;
    this.students.sort((a, b) =>
      (a.student.surname + a.student.name).localeCompare(b.student.surname + b.student.name));
    this.currentGroupName = this.currentGroup.name;
    console.log(this.fieldsOfKnowledge);
  }

  onFacultyChange() {
    if (this.currentFaculty.id === 0) {
      this.filteredGroups =  this.groups;
    } else {
      this.filteredGroups = this.groups.filter(group => !group.specialization || group.specialization.facultyId == this.currentFaculty.id);
    }
    this.filteredGroups[0].studentDegrees = [];
    for (let i = 1; i < this.filteredGroups.length; i++) {
      this.filteredGroups[0].studentDegrees.push(...this.filteredGroups[i].studentDegrees);
    }
    this.currentGroup = this.filteredGroups[0];
    this.students = this.currentGroup.studentDegrees;
    this.students.sort((a, b) =>
      (a.student.surname + a.student.name).localeCompare(b.student.surname + b.student.name));
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
    this.isAllCoursesSelected = this.selectedCourses.length > 0;
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
    this.isAllStudentsSelected = Boolean(this.isSelectedStudentsEmpty());
  }

  changeAllCoursesIsSelected(): void {
    if (this.selectedCourses.length > 0) {
      this.filteredSelectiveCourses.forEach(item => item.selected = this.isAllCoursesSelected);
      this.selectedCourses = [];
    }
  }

  changeAllStudentsIsSelected() {
    if (this.selectedStudents.length > 0) {
      this.selectedStudents.forEach(student => student.selected = false);
      this.selectedStudents = []
    } else {
      this.currentGroup.studentDegrees.forEach(student => student.selected = true);
      this.selectedStudents.push(...this.currentGroup.studentDegrees);
    }
  }

  isSelectedCourseEmpty() {
      return this.selectedCourses.length;
  }

  isSelectedStudentsEmpty() {
    return this.selectedStudents.length;
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

  onFieldOfKnowledge() {
    this.filteredSelectiveCourses = [];
    if (this.selectiveCourses.length > 0) {
      for (let i = 0; i < this.selectiveCourses.length; i++) {
        if (this.currentFieldOfKnowledge.id === ALL_COURSES) {
          this.filteredSelectiveCourses = this.selectiveCourses;
        } else if (this.currentFieldOfKnowledge.id === GENERAL_ONLY) {
          if (TypeCycle[this.selectiveCourses[i].trainingCycle] == TypeCycle.GENERAL) {
            this.filteredSelectiveCourses.push(this.selectiveCourses[i])
          }
        } else {
          if (this.selectiveCourses[i].fieldsOfKnowledge &&
            this.selectiveCourses[i].fieldsOfKnowledge.some(fieldOfKn => fieldOfKn.id == this.currentFieldOfKnowledge.id)) {
            this.filteredSelectiveCourses.push(this.selectiveCourses[i]);
          }
        }
      }
    }
  }
}
