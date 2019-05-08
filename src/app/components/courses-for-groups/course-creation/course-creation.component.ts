import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {NotificationsService} from 'angular2-notifications';
import {TypeaheadMatch} from 'ngx-bootstrap';

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
  alertOptions = {
    showProgressBar: false,
    timeOut: 5000,
    pauseOnHover: false,
    clickToClose: true,
    maxLength: 10,
    maxStack: 3,
  };

  constructor(private courseService: CourseService,
              private knowledgeControlService: KnowledgeControlService,
              private _service: NotificationsService,
              private fb: FormBuilder) {
    this.form = fb.group({
      courseName: this.fb.group({
        id: '',
        name: ['', Validators.required],
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
      this.courseNamesArray = this.courseNames.map(courseName => courseName.name);
    });
  }

  get courseName() {
    return this.form.controls.courseName as FormGroup;
  }

  onSelect(event: TypeaheadMatch): void {
    this.form.controls.courseName.setValue(event.item);
  }

  checkCourseName(courseName) {
    if (!this.courseNamesArray.includes(courseName.name)) {
      this.courseName.controls.id.setValue('');
      this.courseName.controls.name.setValue(courseName.name);
    }
  }

  createCourse(isAddingToCourseForGroup: boolean) {
    this.setCredits();
    this.checkCourseName(this.courseName.value);
    const courseIsAlreadyExist = this.courses.some(c => Course.same(c, this.form.value));
    if (courseIsAlreadyExist) {
      this._service.error('Помилка', 'Предмет вже існує або поля заповнені невірно!', this.alertOptions);
    } else {
      this.courseService.createCourse(this.form.value).subscribe((course: Course) => {
          this.success = true;
          this.failCreated = false;
          this.fail = false;
          this.onCourseCreation.emit();
          if (isAddingToCourseForGroup) {
            this.onCourseAdding.emit(course);
          }
        },
        error => {
          if (error.status === 422) {
            this.failCreated = true;
            this.success = false;
          } else {
            this.success = false;
            this.fail = true;
          }
          this.showAlert();
        });
    }
  }

  showAlert() {
    if (this.success) {
      this._service.success('Предмет створено',
        '',
        this.alertOptions);
    }
    if (this.failCreated) {
      this._service.error('Помилка',
        'Предмет вже існує або поля заповнені невірно!',
        this.alertOptions);
    }
    if (this.fail) {
      this._service.error('Невідома помилка',
        '',
        this.alertOptions);
    }
  }

  private setCredits() {
    const credits = this.form.controls.hours.value / this.form.controls.hoursPerCredit.value;
    this.form.controls.credits.setValue(credits);
  }

}
