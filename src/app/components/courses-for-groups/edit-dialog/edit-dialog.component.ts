import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";
import {KnowledgeControl} from "../../../models/KnowlegeControl";
import {KnowledgeControlService} from "../../../services/knowledge-control.service";
import {CourseService} from "../../../services/course.service";
import {CourseName} from "../../../models/CourseName";
import {StudentGroup} from '../../../models/StudentGroup';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {CourseForGroupService} from "../../../services/course-for-group.service";
import {CourseForGroup} from "../../../models/CourseForGroup";
import {FormGroup} from "@angular/forms";
import {Course} from "../../../models/Course";

@Component({
  selector: 'edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
  providers: [CourseService, KnowledgeControlService, CourseForGroupService]
})
export class EditDialogComponent implements OnInit {
  @Input() selectedGroup: StudentGroup = new StudentGroup();
  @Input() course: CourseForGroup = new CourseForGroup();
  form: FormGroup;
  knowledgeControl: KnowledgeControl[] = [];
  courseNames: CourseName[];
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(private knowledgeControlService: KnowledgeControlService,
              private courseService: CourseService,
              private courseForGroupService: CourseForGroupService,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
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
    if (name instanceof CourseName) {
      return;
    }
    else {
      let courseName = new CourseName();
      courseName.name = name;
      this.course.course.courseName = courseName;
    }
  }

  canselChanges() {
    this.activeModal.close('Close click')
  }

  saveChanges() {
    console.log(this.selectedGroup.id, {
      courseForGroupId: this.course.id,
      oldCourseId: this.course.course.id,
      newCourse: this.course.course
    });
    this.courseForGroupService.changeCourse(this.selectedGroup.id, {
      courseForGroupId: this.course.id,
      oldCourseId: this.course.course.id,
      newCourse: this.course.course
    }).subscribe(() => {
      this.course = new CourseForGroup();
    });
    this.activeModal.close('Close click')
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
}
