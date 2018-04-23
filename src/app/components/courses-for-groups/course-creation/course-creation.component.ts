import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Course} from '../../../models/Course';
import {KnowledgeControl} from '../../../models/KnowlegeControl';
import {CourseService} from '../../../services/course.service';
import {KnowledgeControlService} from '../../../services/knowledge-control.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CourseName} from '../../../models/CourseName';

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

    this.form = new FormGroup({
      'courseName': new FormControl(this.course.courseName.name, [
        Validators.required,
      ]),
      'semester': new FormControl(this.course.semester, [
        Validators.required,
      ]),
      'hours': new FormControl(this.course.hours, [
        Validators.required,
      ]),
      'kc': new FormControl(this.course.knowledgeControl.name, [
        Validators.required,
      ]),
    });
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
