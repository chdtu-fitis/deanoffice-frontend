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
import {GeneralService} from "../../../services/general.service";

const ALL_ITEMS = 0, GENERAL_ONLY = -1;

@Component({
  selector: 'add-courses-for-students',
  templateUrl: './add-courses-for-students.component.html',
  styleUrls: ['./add-courses-for-students.component.scss']
})

export class AddCoursesForStudentsComponent implements OnInit {
  degrees: Degree[] = [];
  currentDegree: Degree;
  groups: StudentGroup[] = [];
  allGroupsItem: StudentGroup;
  filteredGroups: StudentGroup[] = [];
  faculties: Faculty[];
  currentFaculty: Faculty;
  currentGroup: StudentGroup;
  students: StudentDegree[];
  selectedYear: string;
  currentYearInDB: number;
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
              private facultyService: FacultyService, private generalService: GeneralService) {}

  ngOnInit() {
    this.years = [1, 2, 3, 4];
    this.generalService.getCurrentYear().subscribe(currentYear => {
      this.currentYearInDB = currentYear.currYear;
      this.degreeService.getDegrees().subscribe(degrees => {
        this.degrees = degrees;
        if (this.degrees) {
          this.currentDegree = this.degrees[0];
          this.onDegreeOrYearChange();
        }
      });
    });
    this.facultyService.getFaculties().subscribe((faculties: Faculty[]) => {
      this.faculties = faculties;
      const allFacultiesItem = new Faculty();
      allFacultiesItem.id = ALL_ITEMS;
      allFacultiesItem.abbr = "Всі";
      this.faculties.unshift(allFacultiesItem);
      this.currentFaculty = this.faculties[0];
    });
    this.fieldOfKnowledgeService.getFieldsOfKnowledge().subscribe(fieldsOfKnowledge => {
      this.fieldsOfKnowledge = fieldsOfKnowledge;
      const allFieldsOfKnowledgeItem = new FieldOfKnowledge();
      allFieldsOfKnowledgeItem.id = ALL_ITEMS;
      allFieldsOfKnowledgeItem.name = "Всі";
      allFieldsOfKnowledgeItem.code = "";
      const generalFieldsOfKnowledge = new FieldOfKnowledge();
      generalFieldsOfKnowledge.id = GENERAL_ONLY;
      generalFieldsOfKnowledge.name = "Загальні";
      generalFieldsOfKnowledge.code = "";
      this.fieldsOfKnowledge.unshift(generalFieldsOfKnowledge);
      this.fieldsOfKnowledge.unshift(allFieldsOfKnowledgeItem);
      this.currentFieldOfKnowledge = this.fieldsOfKnowledge[0];
    });
  }

  onDegreeOrYearChange(): void {
    this.groupService.getGroupsByDegreeAndRealYear(this.currentDegree.id, this.currentYear)
      .subscribe(groups => {
        this.isAllStudentsSelected = false;
        this.groups = groups ? groups : [];
        this.allGroupsItem = new StudentGroup();
        this.allGroupsItem.name = "Всі";
        this.allGroupsItem.id = ALL_ITEMS;
        this.allGroupsItem.studentDegrees = [];

        for (let i = 0; i < this.groups.length; i++) {
          this.groups[i].studentDegrees.forEach(sd => sd.groupName = groups[i].name);
          this.allGroupsItem.studentDegrees.push(...this.groups[i].studentDegrees);
        }
        let students = this.allGroupsItem.studentDegrees;
        students.sort((a, b) =>
          (a.student.surname + a.student.name).localeCompare(b.student.surname + b.student.name));
        this.groups.unshift(this.allGroupsItem);
        this.filteredGroups = groups;
        this.selectedStudents = [];
        this.selectedCourses = [];
        this.onFacultyChange();
      });

    const studyYearForCourses = this.currentYear + (+this.selectedYear - this.currentYearInDB);
    const firstSemesterForCourses = studyYearForCourses * 2 - 1;
    this.selectiveCourseService.getSelectiveCourses(this.selectedYear, this.currentDegree.id, firstSemesterForCourses, false)
      .subscribe(selectiveCourses => {
        this.isAllCoursesSelected = false;
        this.currentFieldOfKnowledge = this.fieldsOfKnowledge[0];
        this.selectiveCourses = selectiveCourses;
        this.filteredSelectiveCourses = this.selectiveCourses;
        this.selectiveCourseService.getSelectiveCourses(this.selectedYear, this.currentDegree.id, firstSemesterForCourses + 1, false)
          .subscribe(selectiveCourses2 => {
            this.selectiveCourses.push(...selectiveCourses2);
          });
      });
  }

  onGroupChange() {
    this.students = this.currentGroup.studentDegrees;
  }

  onFacultyChange() {
    if (this.currentFaculty.id === ALL_ITEMS) {
      this.filteredGroups = this.groups;
    } else {
      this.filteredGroups = this.groups.filter(group => !group.specialization || group.specialization.facultyId == this.currentFaculty.id);
      this.filteredGroups[0].studentDegrees = [];
      for (let i = 1; i < this.filteredGroups.length; i++) {
        this.filteredGroups[0].studentDegrees.push(...this.filteredGroups[i].studentDegrees);
        this.students.sort((a, b) =>
          (a.student.surname + a.student.name).localeCompare(b.student.surname + b.student.name));
      }
    }
    this.currentGroup = this.filteredGroups.length > 1 ? this.filteredGroups[1] : this.filteredGroups[0];
    this.students = this.currentGroup.studentDegrees;
  }

  changeSelectedCourses(checked: boolean, selectedCourse: SelectiveCourse) {
    if (!checked) {
      for (const course of this.selectedCourses) {
        if (course.id === selectedCourse.id) {
          this.selectedCourses.splice(this.selectedCourses.indexOf(course), 1);
          break;
        }
      }
    } else {
      this.selectedCourses.push(selectedCourse);
    }
    this.isAllCoursesSelected = this.isSelectedCourseEmpty();
  }

  changeSelectedStudents(checked: boolean, selectedStudent: StudentDegree) {
    if (!checked) {
      for (const student of this.selectedStudents) {
        if (student.id === selectedStudent.id) {
          this.selectedStudents.splice(this.selectedStudents.indexOf(student), 1);
          break;
        }
      }
    } else {
      this.selectedStudents.push(selectedStudent);
    }
    this.isAllStudentsSelected = this.isSelectedStudentsEmpty();
  }

  changeAllCoursesIsSelected(): void {
    if (this.selectedCourses.length > 0) {
      this.filteredSelectiveCourses.forEach(item => item.selected = this.isAllCoursesSelected);
      this.selectedCourses = [];
    }
  }

  changeAllStudentsIsSelected(): void {
    if (this.selectedStudents.length > 0) {
      this.selectedStudents.forEach(student => student.selected = false);
      this.selectedStudents = []
    } else {
      this.currentGroup.studentDegrees.forEach(student => student.selected = true);
      this.selectedStudents.push(...this.currentGroup.studentDegrees);
    }
  }

  isSelectedCourseEmpty(): boolean {
      return this.selectedCourses.length > 0;
  }

  isSelectedStudentsEmpty(): boolean {
    return this.selectedStudents.length > 0;
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
    this.isAllStudentsSelected = false;
  }

  onFieldOfKnowledge() {
    this.filteredSelectiveCourses = [];
    if (this.selectiveCourses.length > 0) {
      if (this.currentFieldOfKnowledge.id === ALL_ITEMS) {
        this.filteredSelectiveCourses = this.selectiveCourses;
      } else if (this.currentFieldOfKnowledge.id === GENERAL_ONLY) {
          this.filteredSelectiveCourses = this.selectiveCourses.filter(selCourse => TypeCycle[selCourse.trainingCycle] == TypeCycle.GENERAL);
      } else {
          this.filteredSelectiveCourses = this.selectiveCourses.filter(selectiveCourse => selectiveCourse.fieldsOfKnowledge &&
            selectiveCourse.fieldsOfKnowledge.some(fieldOfKn => fieldOfKn.id == this.currentFieldOfKnowledge.id));
      }
    }
  }
}
