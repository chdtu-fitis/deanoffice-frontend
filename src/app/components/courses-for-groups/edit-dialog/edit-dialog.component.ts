import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";
import {KnowledgeControl} from "../../../models/KnowlegeControl";
import {KnowledgeControlService} from "../../../services/knowledge-control.service";
import {CourseService} from "../../../services/course.service";
import {CourseName} from "../../../models/CourseName";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Course} from "../../../models/Course";

@Component({
  selector: 'edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
  providers: [CourseService, KnowledgeControlService]
})
export class EditDialogComponent implements OnInit {

  @Input() course: Course;
  form;
  knowledgeControl: KnowledgeControl[] = [];
  courseNames: CourseName[];
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(private knowledgeControlService: KnowledgeControlService,
              private courseService: CourseService,
              public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.knowledgeControlService.getAll().subscribe(kc => {
      this.knowledgeControl = kc;
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
        : this.courseNames.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  checkCourseName(name) {
    if (name instanceof CourseName) {
      return;
    }
    else {
      let courseName = new CourseName();
      courseName.name = name;
      this.course.courseName = courseName;
    }
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
