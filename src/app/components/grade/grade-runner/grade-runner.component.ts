import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GradeRunners} from './models/GradeRunners';
import {GradeRunner} from './models/GradeRunner';
import {Course} from './models/Course';
import {ExamReportService} from '../../../services/exam-report.service';
import {Student} from './models/Student';

@Component({
  selector: 'app-grade-runner',
  templateUrl: './grade-runner.component.html',
  styleUrls: ['./grade-runner.component.scss']
})
export class GradeRunnerComponent implements OnInit {

  @Input() gradeRunners: GradeRunners[];
  @Input() activeGradeRunner: GradeRunner;
  @Output() removeCourseFromGradeRunners = new EventEmitter();
  @Output() addGradeRunner = new EventEmitter();
  @Output() clearGradeRunner = new EventEmitter();

  private isShowCart: boolean;

  constructor(private examReportService: ExamReportService) {}

  ngOnInit(): void {
  }

  toggleCart(): void {
    this.isShowCart = !this.isShowCart;
  }

  removeCourse(student: Student, course: Course): void {
    this.removeCourseFromGradeRunners.emit(new GradeRunner(student, course));
  }

  addToGradeRunners(): void {
    this.addGradeRunner.emit();
  }

  generate(): void {
    this.examReportService.buildStudentsAndCoursesReport(this.gradeRunners);
    this.clearGradeRunner.emit();
  }
}
