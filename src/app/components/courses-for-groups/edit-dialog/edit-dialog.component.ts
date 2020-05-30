import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {BsModalRef} from 'ngx-bootstrap/modal';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead'

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
  form: FormGroup;
  knowledgeControl: KnowledgeControl[] = [];
  courseNames: CourseName[];
  courseNamesArray: string[];

  constructor(private knowledgeControlService: KnowledgeControlService,
              private courseService: CourseService,
              private courseForGroupService: CourseForGroupService,
              private fb: FormBuilder,
              public bsModalRef: BsModalRef) {
    this.form = fb.group({
      id: '',
      course: this.fb.group({
        id: '',
        courseName: this.fb.group({
          id: '',
          name: ['', Validators.required],
        }),
        hours: ['', Validators.required],
        semester: '',
        hoursPerCredit: ['', Validators.required],
        knowledgeControl: ['', Validators.required],
        credits: ''
      })
    });
  }

  ngOnInit() {
    const oldCourse = JSON.parse(JSON.stringify(this.courseFromTable));
    this.form.patchValue(oldCourse);
    this.courseService.getCourseNames().subscribe((courseNames: CourseName[]) => {
      this.courseNames = courseNames;
      this.courseNamesArray = this.courseNames.map(courseName => courseName.name);
    });
    this.knowledgeControlService.getAll().subscribe(knowledgeControl => {
      this.knowledgeControl = knowledgeControl;
    });
  }

  get course() {
    return this.form.controls.course as FormGroup;
  }

  get courseName() {
    return this.course.controls.courseName as FormGroup;
  }

  onSelect(event: TypeaheadMatch): void {
    this.courseName.setValue(event.item);
  }

  checkCourseName(courseName) {
    if (!this.courseNamesArray.includes(courseName.name)) {
      this.courseName.controls.id.setValue('');
      this.courseName.controls.name.setValue(courseName.name);
    }
  }

  saveChanges() {
    this.checkCourseName(this.courseName.value);
    this.courseForGroupService.changeCourse(this.selectedGroup.id, {
      courseForGroupId: this.form.controls.id.value,
      oldCourseId: this.course.controls.id.value,
      newCourse: this.course.value
    }).subscribe((course: Course) => {
      this.courseFromTable.course = course;
    });
    this.bsModalRef.hide()
  }

  setCredits() {
    const credits = this.course.controls.hours.value / this.course.controls.hoursPerCredit.value;
    this.course.controls.credits.setValue(credits);
  }

  compareById(item1, item2) {
    return item1.id === item2.id;
  }

}
