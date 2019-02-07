import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {BsModalRef} from 'ngx-bootstrap';

import {KnowledgeControl} from '../../../models/KnowlegeControl';
import {KnowledgeControlService} from '../../../services/knowledge-control.service';
import {CourseService} from '../../../services/course.service';
import {CourseName} from '../../../models/CourseName';
import {StudentGroup} from '../../../models/StudentGroup';
import {CourseForGroupService} from '../../../services/course-for-group.service';
import {CourseForGroup} from '../../../models/CourseForGroup';
import {Course} from '../../../models/Course';

@Component({
  selector: 'edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
  providers: [CourseService, KnowledgeControlService, CourseForGroupService]
})
export class EditDialogComponent implements OnInit {
  selectedGroup: StudentGroup = new StudentGroup();
  courseFromTable = new CourseForGroup();
  course: CourseForGroup;
  // TODO use Reactive forms
  form: FormGroup;
  knowledgeControl: KnowledgeControl[] = [];
  courseNames: CourseName[];
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(private knowledgeControlService: KnowledgeControlService,
              private courseService: CourseService,
              private courseForGroupService: CourseForGroupService,
              public bsModalRef: BsModalRef) {
  }

  ngOnInit() {
    this.course = JSON.parse(JSON.stringify(this.courseFromTable));
    this.courseService.getCourseNames().subscribe((courseNames: CourseName[]) => {
      this.courseNames = courseNames;
    });
    this.knowledgeControlService.getAll().subscribe(kc => {
      this.knowledgeControl = kc;
    });
  }

  formatter = (result: CourseName) => result.name;

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => term === '' ? []
        : this.courseNames.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  checkCourseName(name) {
    if (!name.id) {
      const courseName = new CourseName();
      courseName.name = name;
      this.course.course.courseName = courseName;
    }
  }

  canselChanges() {
    this.bsModalRef.hide()
  }

  saveChanges() {
    this.checkCourseName(this.course.course.courseName);
    this.courseForGroupService.changeCourse(this.selectedGroup.id, {
      courseForGroupId: this.course.id,
      oldCourseId: this.course.course.id,
      newCourse: this.course.course
    }).subscribe((course: Course) => {
      this.courseFromTable.course = course;
    });
    this.bsModalRef.hide()
  }

  calculateCredits(course: Course){
    return course.hours/course.hoursPerCredit;
  }

  setCredits(){
    this.course.course.credits = this.calculateCredits(this.course.course);
  }

  roundCredits(){
    this.course.course.credits = Math.round(this.course.course.credits);
  }

  get courseName() {
    return this.form.get('courseName');
  }

  get semester() {
    return this.form.get('semester');
  }

  get kc() {
    return this.form.get('kc');
  }

  compareById(item1, item2) {
    return item1.id === item2.id;
  }

}
