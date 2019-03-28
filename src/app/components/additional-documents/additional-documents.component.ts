import {Component, OnInit} from '@angular/core';

import {Degree} from '../../models/Degree';
import {StudentGroup} from '../../models/StudentGroup';
import {GroupService} from '../../services/group.service';
import {DegreeService} from '../../services/degree.service';
import {CourseForGroupService} from '../../services/course-for-group.service';
import {ExamReportService} from '../../services/exam-report.service';
import {TuitionForm} from '../../models/tuition-form.enum';

@Component({
  selector: 'additional-documents',
  templateUrl: './additional-documents.component.html',
  styleUrls: ['./additional-documents.component.scss']
})
export class AdditionalDocumentsComponent implements OnInit {
  degrees: Degree[] = [];
  currentDegree: Degree;

  groups: StudentGroup[];
  currentGroup: StudentGroup;

  years: Array<number>;
  selectedYear: number;
  semesters: Array<number>;
  selectedSemester: number;

  examReportJournalTableLoading = false;
  gradesJournalStudentsDocumentLoading = false;
  gradesJournalStudentsTableLoading = false;
  gradesJournalCoursesTableLoadingPdf = false;
  gradesJournalCoursesTableLoadingDocx = false;
  studentsListLoading = false;

  tuitionFormType = TuitionForm;
  tuitionFormKey: Array<string>;
  selectedTuitionForm;

  constructor(private groupService: GroupService,
              private degreeService: DegreeService,
              private courseForGroupService: CourseForGroupService,
              private examReportService: ExamReportService) {
  }

  ngOnInit() {
    this.years = [1, 2, 3, 4, 5, 6];
    this.semesters = [1, 2];
    this.selectedYear = 1;
    this.tuitionFormKey = Object.keys(TuitionForm);
    this.selectedTuitionForm = this.tuitionFormKey[0];
    this.setInitialSemester();

    this.degreeService.getDegrees()
      .subscribe(degrees => {
        this.degrees = degrees;
        if (this.degrees) {
          this.currentDegree = this.degrees[0];
          this.onDegreeChange();
        }
      });
  }

  onDegreeChange(): void {
    this.selectedYear = 1;
    this.groupService.getGroupsByDegreeAndYear(this.currentDegree.id, this.selectedYear)
      .subscribe(groups => {
        this.groups = groups;
        if (this.groups) {
          this.currentGroup = groups[0];
        }
      });
  }

  onYearChange(): void {
    this.groupService.getGroupsByDegreeAndYear(this.currentDegree.id, this.selectedYear)
      .subscribe(groups => {
        if (groups) {
          this.groups = groups;
          this.currentGroup = groups[0];
        }
      });
  }

  onTuitionFormChange() {
    console.log(this.selectedTuitionForm);
  }

  onExamReportJournalBuild(): void {
    this.examReportJournalTableLoading = true;
    this.examReportService.buildExamReportJournalDoc(this.selectedYear, this.currentDegree.id,
      (this.selectedYear - 1) * 2 + this.selectedSemester).subscribe(() => {
      this.examReportJournalTableLoading = false;
    });
  }

  onGradesJournalStudentsListBuild() {
    this.gradesJournalStudentsTableLoading = true;
    this.examReportService.buildGradesJournalStudentsPdf(this.selectedYear, this.currentDegree.id).subscribe(() => {
      this.gradesJournalStudentsTableLoading = false;
    });
  }

  onGradesJournalCoursesListBuildPdf() {
    this.gradesJournalCoursesTableLoadingPdf = true;
    this.examReportService.buildGradesJournalCoursesPdf(this.selectedYear, this.currentDegree.id).subscribe(() => {
      this.gradesJournalCoursesTableLoadingPdf = false;
    });
  }

  onGradesJournalStudentsDocument() {

    this.gradesJournalStudentsDocumentLoading = true;
    this.examReportService.buildFormRatingGradeJornalDocx(this.selectedYear,
      this.currentDegree.id, this.selectedSemester, this.selectedTuitionForm).subscribe(() => {
      console.log(this.selectedYear, this.currentDegree.id, this.selectedSemester, this.selectedTuitionForm);
      this.gradesJournalStudentsDocumentLoading = false
    }
  )
    ;
  }

  onGradesJournalCoursesListBuildDocx() {
    this.gradesJournalCoursesTableLoadingDocx = true;
    this.examReportService.buildGradesJournalCoursesDocx(this.selectedYear, this.currentDegree.id).subscribe(() => {
      this.gradesJournalCoursesTableLoadingDocx = false;
    });
  }

  onStudentsListBuild() {
    this.studentsListLoading = true;
    this.examReportService.buildStudentsList(this.selectedYear, this.currentDegree.id, this.selectedTuitionForm).subscribe(() => {
      this.studentsListLoading = false;
    });
  }

  setInitialSemester(): void {
    const currentDate = new Date();
    if (currentDate.getMonth() > 1 && currentDate.getMonth() < 9) {
      this.selectedSemester = 2;
    } else {
      this.selectedSemester = 1;
    }
  }
}
