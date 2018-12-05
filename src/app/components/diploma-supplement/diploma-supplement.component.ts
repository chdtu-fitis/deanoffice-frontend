import { Component, OnInit } from '@angular/core';
import { Degree } from '../../models/Degree';
import { DegreeService } from '../../services/degree.service';
import { GroupService } from '../../services/group.service';
import { StudentGroup } from '../../models/StudentGroup';
import { StudentDegree } from '../../models/StudentDegree';
import { DiplomaSupplementService } from '../../services/diploma-supplement.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentsDataCheckComponent } from './students-data-check/students-data-check.component';

@Component({
  selector: 'diploma-supplement',
  templateUrl: './diploma-supplement.component.html',
  styleUrls: [ './diploma-supplement.component.scss' ]
})
export class DiplomaSupplementComponent implements OnInit {
  degrees: Degree[];
  groups: StudentGroup[];
  currentGroup: StudentGroup;
  students: StudentDegree[];
  studentsSelected: boolean;
  message: string;
  supplementLoading = false;
  gradePercentLoading = false;
  gradesTableReportLoading = false;
  coursesTableReportLoading = false;
  studentDataCheckLoading = false;

  constructor(private degreeService: DegreeService, private groupService: GroupService,
              private diplomaSupplementService: DiplomaSupplementService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.degreeService.getDegrees()
      .subscribe(degrees => {
        this.degrees = degrees;
        this.onDegreeChange('1');
      });
  }

  onDegreeChange(degreeId: string): void {
    this.groupService.getGroupsByDegree(degreeId)
      .subscribe(groups => {
        this.groups = groups;
        this.onGroupChange(this.groups[0].id.toString());
      });
  }

  onGroupChange(groupId: string): void {
    this.currentGroup = this.groups.find(x => (+x.id) === (+groupId));
    this.students = this.currentGroup.studentDegrees;
    for (let student of this.students) {student.selected = true;}
    this.studentsSelected = true;
  }

  onSelectAllStudents(checked: boolean): void {
    for (let student of this.students) {
      student.selected = checked;
    }
  }

  onFormSupplement(): void {
    this.message = '';
    for (let student of this.students) {
      this.supplementLoading = true;
      if (student.selected) {
        this.diplomaSupplementService
          .buildDiplomaSupplement('' + student.id)
          .subscribe(() => this.supplementLoading = false);
      }
    }
  }

  onFormGradePercent(): void {
    this.message = '';
    this.gradePercentLoading = true;
    this.diplomaSupplementService
      .buildGradePercent('' + this.currentGroup.id)
      .subscribe(() => this.gradePercentLoading = false);
  }

  onFullGradesTableReport(): void {
    this.gradesTableReportLoading = true;
    this.diplomaSupplementService
      .buildFullGradesTableReport('' + this.currentGroup.id)
      .subscribe(() => this.gradesTableReportLoading = false);
  }

  onFullCoursesTableReport(): void {
    this.coursesTableReportLoading = true;
    this.diplomaSupplementService
      .buildFullCoursesTableReport('' + this.currentGroup.id)
      .subscribe(() => this.coursesTableReportLoading = false);
  }

  onStudentDataCheck(): void {
    this.message = '';
    this.studentDataCheckLoading = true;
    this.diplomaSupplementService.checkStudentsData('1').subscribe(res => {
      this.studentDataCheckLoading = false;
      const modalRef = this.modalService.open(StudentsDataCheckComponent, {
        centered: true,
        size: 'lg' 
      });
      modalRef.componentInstance.studentsCheckData = res;
    }
    );
  }
}
