import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GradeRunners} from './models/GradeRunners';
import {Person} from '../../../models/basemodels/Person';
import {NameEntity} from '../../../models/basemodels/NameEntity';
import {GradeRunner} from './models/GradeRunner';

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

  ngOnInit(): void {
  }

  toggleCart(): void {
    this.isShowCart = !this.isShowCart;
  }

  removeCourse(student: Person, course: NameEntity): void {
    this.removeCourseFromGradeRunners.emit(new GradeRunner(student, course));
  }

  addToGradeRunners(): void {
    this.addGradeRunner.emit();
  }

  generate(): void {
    // :TODO send request to backend

    this.clearGradeRunner.emit();
  }
}
