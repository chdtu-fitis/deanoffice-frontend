import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {SelectiveCourse} from '../../../models/SelectiveCourse';
import {Department} from '../../../models/Department';
import {TeacherSearchComponent} from '../teacher-search/teacher-search.component';
import {Course} from '../../../models/Course';
import {Teacher} from '../../../models/Teacher';

@Component({
  selector: 'selective-course-form',
  templateUrl: './selective-course-form.component.html',
  styleUrls: ['./selective-course-form.component.scss']
})
export class SelectiveCourseFormComponent implements OnInit {
  @Input() course: Course;
  @Input() departments: Department[];

  @ViewChild('teacher', {static: true}) teacher: TeacherSearchComponent;
  @ViewChild('department', {static: true}) department: ElementRef;
  @ViewChild('description', {static: true}) description: ElementRef;
  @ViewChild('groupName', {static: true}) groupName: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  getTeacher() {
    return this.teacher.selectedTeacher;
  }

  setTeacher(teacher) {
    this.teacher.selectTeacher(teacher);
  }

  getDepartment() {
    return this.department.nativeElement.value;
  }

  setDepartment(department) {
    this.department.nativeElement.value = department.id;
    this.department.nativeElement.innerHTML = department.name;
  }

  getDescription() {
    return this.description.nativeElement.value;
  }

  setDescription(description) {
    return this.description.nativeElement.value = description;
  }

  getGroupName() {
    return this.groupName.nativeElement.value;
  }

  setGroupName(groupName) {
    return this.groupName.nativeElement.value = groupName;
  }
}
