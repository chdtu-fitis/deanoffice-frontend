import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Course} from '../../../models/Course';
import {KnowledgeControl} from '../../../models/KnowlegeControl';
import {CourseService} from '../../../services/course.service';
import {KnowledgeControlService} from '../../../services/knowledge-control.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CourseName} from '../../../models/CourseName';
import {Subject} from 'rxjs/Subject';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'course-creation',
  templateUrl: './course-creation.component.html',
  styleUrls: ['./course-creation.component.scss'],
  providers: [CourseService, KnowledgeControlService]
})
export class CourseCreationComponent implements OnInit {
  course = new Course();
  knowledgeControl: KnowledgeControl[] = [];
  form;
  success = false;
  failCreated = undefined;
  fail = undefined;
  courseNames: CourseName[];
  @Output() onCourseCreation = new EventEmitter();
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(private courseService: CourseService, private knowledgeControlService: KnowledgeControlService) {
    this.course.hoursPerCredit = 30;
  }


  ngOnInit() {
    this.knowledgeControlService.getAll().subscribe(kc => {
      this.knowledgeControl = kc;
    });
    this.courseService.getCourseNames().subscribe((courseNames: CourseName[]) =>{
      this.courseNames = courseNames;
    });

    // this.form = new FormGroup({
    //   'courseName': new FormControl(this.course.courseName.name, [
    //     Validators.required,
    //   ]),
    //   'semester': new FormControl(this.course.semester, [
    //     Validators.required,
    //   ]),
    //   'hours': new FormControl(this.course.hours, [
    //     Validators.required,
    //   ]),
    //   'kc': new FormControl(this.course.knowledgeControl.name, [
    //     Validators.required,
    //   ]),
    // });
  }

  formatter = (result: CourseName) => result.name;


  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => term === '' ? []
        : this.courseNames.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  checkCourseName(name){
    if (name instanceof CourseName) {
      console.dir(name);
      return;
    }
    else {
      let courseName = new CourseName();
      courseName.name = name;
      this.course.courseName = courseName;
      console.dir(this.course);
    }
  }

  createCourse(){
    this.setCredits();
    console.dir(this.course);
    this.courseService.createCourse(this.course).subscribe(() => {
      this.success = true;
      this.failCreated = false;
      this.fail = false;
      this.onCourseCreation.emit();
      },
        error => {
      console.log(error);
      if (error.status === 422) {
        this.failCreated = true;
        this.success = false;
      }
      else {
        this.success = false;
        this.fail = true;
      }
    });
  }

  get courseName() { return this.form.get('courseName'); }
  get semester() { return this.form.get('semester'); }
  get hours() { return this.form.get('hours'); }
  get kc() { return this.form.get('kc'); }

  private setCredits(){
    this.course.credits = this.course.hours / this.course.hoursPerCredit;
  }

}
