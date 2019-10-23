import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';

import {DegreeService} from '../../services/degree.service';
import {GroupService} from '../../services/group.service';
import {Degree} from '../../models/Degree';
import {StudentGroup} from '../../models/StudentGroup';
import {StudentDegree} from '../../models/StudentDegree';
import {DiplomaSupplementService} from '../../services/diploma-supplement.service';
import {StudentsDataCheckComponent} from './students-data-check/students-data-check.component';
import {CoursesTranslationCheckComponent} from './courses-translation-check/courses-translation-check.component';

@Component({
  selector: 'diploma-supplement',
  templateUrl: './diploma-supplement.component.html',
  styleUrls: ['./diploma-supplement.component.scss']
})
export class DiplomaSupplementComponent implements OnInit {
  degrees: Degree[];
  groups: StudentGroup[];
  currentGroup: StudentGroup;
  currentDegreeId: string;
  students: StudentDegree[];
  studentsSelected: boolean;
  message: string;
  supplementLoading = false;
  graduatesReportLoading = false;
  gradesTableReportLoading = false;
  coursesTableReportLoading = false;
  studentDataCheckLoading = false;
  studentGradesCheckLoading = false;
  coursesTranslationCheckLoading = false;

  constructor(private degreeService: DegreeService, private groupService: GroupService,
              private diplomaSupplementService: DiplomaSupplementService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.degreeService.getDegrees()
      .subscribe(degrees => {
        this.degrees = degrees;
        this.onDegreeChange('1');
      });
  }

  onDegreeChange(degreeId: string): void {
    this.currentDegreeId = degreeId;
    this.groupService.getGroupsByDegree(degreeId)
      .subscribe(groups => {
        this.groups = groups;
        this.onGroupChange(this.groups[0].id.toString());
      });
  }

  onGroupChange(groupId: string): void {
    this.currentGroup = this.groups.find(group => group.id === Number(groupId));
    this.students = this.currentGroup.studentDegrees;
    for (const student of this.students) {
      student.selected = true;
    }
    this.studentsSelected = true;
  }

  onSelectAllStudents(checked: boolean): void {
    for (const student of this.students) {
      student.selected = checked;
    }
  }

  onFormSupplement(): void {
    this.message = '';
    for (const student of this.students) {
      this.supplementLoading = true;
      if (student.selected) {
        this.diplomaSupplementService.buildDiplomaSupplement('' + student.id).subscribe(() => {
          this.supplementLoading = false;
        });
      }
    }
  }

  onFormGraduatesReport(): void {
    this.message = '';
    this.graduatesReportLoading = true;
    this.diplomaSupplementService.buildGraduatesReport('' + this.currentGroup.id).subscribe(() => {
        this.graduatesReportLoading = false;
      }
    );
  }

  onFullGradesTableReport(): void {
    this.gradesTableReportLoading = true;
    this.diplomaSupplementService.buildFullGradesTableReport('' + this.currentGroup.id).subscribe(() => {
        this.gradesTableReportLoading = false;
      }
    );
  }

  onFullCoursesTableReport(): void {
    this.coursesTableReportLoading = true;
    this.diplomaSupplementService.buildFullCoursesTableReport('' + this.currentGroup.id).subscribe(() => {
        this.coursesTableReportLoading = false;
      }
    );
  }

  onStudentDataCheck(): void {
    this.message = '';
    this.studentDataCheckLoading = true;
    this.diplomaSupplementService.checkStudentsData(this.currentDegreeId).subscribe(studentsCheckData => {
        this.studentDataCheckLoading = false;
        const header = 'Перевірка даних студента для додатку до диплому';
        this.modalService.show(StudentsDataCheckComponent, {initialState: {studentsCheckData, header}});
      }
    );
  }

  onStudentGradesCheck(): void {
    this.message = '';
    this.studentGradesCheckLoading = true;
    this.diplomaSupplementService.checkStudentsGrades(this.currentDegreeId).subscribe(studentsCheckData => {
        this.studentGradesCheckLoading = false;
        const header = 'Перевірка оцінок для додатку до диплому';
        this.modalService.show(StudentsDataCheckComponent, {initialState: {studentsCheckData, header}});
      }
    );
  }

  onCoursesTranslationCheck(): void {
    this.message = '';
    this.coursesTranslationCheckLoading = true;
    this.diplomaSupplementService.checkCoursesTranslation(this.currentDegreeId).subscribe(coursesTranslationCheckData => {
        this.coursesTranslationCheckLoading = false;
        const header = 'Список дисциплін та груп, в яких немає перекладів дисциплін';
        this.modalService.show(CoursesTranslationCheckComponent, {initialState: {coursesTranslationCheckData, header}});
      }
    );
  }
}
