import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {TypeaheadMatch} from 'ngx-bootstrap';
import {AlertsService} from '../../shared/alerts/alerts.service';

import {Course} from '../../../models/Course';
import {KnowledgeControl} from '../../../models/KnowlegeControl';
import {CourseService} from '../../../services/course.service';
import {KnowledgeControlService} from '../../../services/knowledge-control.service';
import {CourseName} from '../../../models/CourseName';

@Component({
  selector: 'course-creation',
  templateUrl: './course-creation.component.html',
  styleUrls: ['./course-creation.component.scss'],
  providers: [CourseService, KnowledgeControlService]
})
export class CourseCreationComponent implements OnInit {
  @Input() selectedSemester: number;
  @Input() courses: Course[];
  @Output() onCourseAdding = new EventEmitter();
  @Output() onCourseCreation = new EventEmitter();
  knowledgeControl: KnowledgeControl[] = [];
  form: FormGroup;
  success = false;
  failCreated = undefined;
  fail = undefined;
  courseNames: CourseName[];
  courseNamesArray: string[];

  constructor(private courseService: CourseService,
              private knowledgeControlService: KnowledgeControlService,
              private _alerts: AlertsService,
              private fb: FormBuilder) {
    this.form = fb.group({
      courseName: this.fb.group({
        id: '',
        name: ['', Validators.required],
        nameEng: '',
      }),
      hours: ['',  Validators.min(0)],
      semester: '',
      hoursPerCredit: ['', Validators.required],
      knowledgeControl: ['', Validators.required],
      credits: ''
    });
    this.form.controls.hoursPerCredit.setValue(30);
  }

  ngOnInit() {
    this.knowledgeControlService.getAll().subscribe(kc => {
      this.knowledgeControl = kc;
      this.form.controls.knowledgeControl.setValue(this.knowledgeControl[0]);
    });
    this.courseService.getCourseNames().subscribe((courseNames: CourseName[]) => {
      this.courseNames = courseNames;
      this.courseNames.forEach(courseName => courseName.nameEng = '');
      this.courseNamesArray = this.courseNames.map(courseName => courseName.name);
    });
  }

  get courseName() {
    return this.form.controls.courseName as FormGroup;
  }

  onSelect(event: TypeaheadMatch): void {
    this.form.controls.courseName.setValue(event.item);
  }

  checkCourseNameForNew(courseName) {
    if (!this.courseNamesArray.includes(courseName.name)) {
      this.courseName.controls.id.setValue('');
      this.courseName.controls.name.setValue(courseName.name);
      return true;
    } else {
      return false;
    }
  }

  createCourse(isAddingToCourseForGroup: boolean) {
    this.setCredits();
    const isNewCourseName = this.checkCourseNameForNew(this.courseName.value);
    const courseIsAlreadyExist = this.courses.some(c => Course.equal(c, this.form.value));
    if (courseIsAlreadyExist) {
      this._showExistingOrInvalidCourseError();
    } else {
      this.courseService.createCourse(this.form.value).subscribe((course: Course) => {
          this.failCreated = false;
          this.fail = false;
          this.onCourseCreation.emit();
          if (isAddingToCourseForGroup) {
            this.onCourseAdding.emit(course);
          }
          if (isNewCourseName) {
            delete course.courseName.abbreviation;
            course.courseName.nameEng = '';
            this.courseNames.push(course.courseName);
            this.courseNamesArray.push(course.courseName.name);
          }
        },
        error => {
          if (error.status === 422) {
            this._showExistingOrInvalidCourseError()
          } else {
            this._alerts.showUnknownError();
          }
        });
    }
    this.form.controls.courseName.reset();
    this.form.controls.hours.reset();
  }

  private _showExistingOrInvalidCourseError() {
    this._alerts.showError({ body: 'Предмет вже існує або поля заповнені неправильно' });
  }

  private setCredits() {
    const credits = this.form.controls.hours.value / this.form.controls.hoursPerCredit.value;
    this.form.controls.credits.setValue(credits);
  }

}
