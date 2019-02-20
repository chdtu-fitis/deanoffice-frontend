import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {NotificationsService} from 'angular2-notifications';

import {Course} from '../../../models/Course';
import {KnowledgeControl} from '../../../models/KnowlegeControl';
import {CourseService} from '../../../services/course.service';
import {KnowledgeControlService} from '../../../services/knowledge-control.service';
import {CourseName} from '../../../models/CourseName';
import {StudentGroup} from '../../../models/StudentGroup';

@Component({
  selector: 'course-creation',
  templateUrl: './course-creation.component.html',
  styleUrls: ['./course-creation.component.scss'],
  providers: [CourseService, KnowledgeControlService]
})
export class CourseCreationComponent implements OnInit {
  @Input() selectedSemester: number;
  @Output() onCourseAdding = new EventEmitter();
  @Output() onCourseCreation = new EventEmitter();
  knowledgeControl: KnowledgeControl[] = [];
  form: FormGroup;
  success = false;
  failCreated = undefined;
  fail = undefined;
  courseNames: CourseName[];
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
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
      courseName: ['', Validators.required],
      hours: ['', Validators.required],
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
    });
  }

  formatter = (result: CourseName) => result.name;


  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => term === '' ? []
        : this.courseNames.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 16));

  checkCourseName(name) {
    if (!name.id) {
      const courseName = new CourseName();
      courseName.name = name;
      this.form.controls.courseName.setValue(courseName);
    }
  }

  createCourse(isAddingToCourseForGroup: boolean) {
    this.setCredits();
    this.checkCourseName(this.form.controls.courseName.value);
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
    this.form.controls.credits.setValue(
      this.form.controls.hours.value / this.form.controls.hoursPerCredit.value
    );
  }

}
