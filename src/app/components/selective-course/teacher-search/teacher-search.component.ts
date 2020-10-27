import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Teacher} from '../../../models/Teacher';
import {TeacherService} from '../../../services/teacher.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'teacher-search',
  templateUrl: './teacher-search.component.html',
  styleUrls: ['./teacher-search.component.scss']
})
export class TeacherSearchComponent implements OnInit {
  form: FormGroup;

  @Output() onTeacherSelect = new EventEmitter();
  teachers: Teacher[] = [];
  selectedTeacher: Teacher;
  searchText: string;
  showResults = false;

  constructor(private teacherService: TeacherService, private fb: FormBuilder) {
    this.form = fb.group({
      searchBox: new FormControl(this.searchText, [

      ]),
    });
  }

  ngOnInit() {
    this.teacherService.getTeachersShort().subscribe(teachers => {
      this.teachers = teachers
    })
  }

  selectTeacher(teacher: Teacher) {
    this.showResults = false;
    this.selectedTeacher = teacher;
    this.searchText = teacher.surname + ' ' + teacher.name + ' ' + teacher.patronimic;
    this.onTeacherSelect.emit(teacher);
  }

  onSearchTextChange(searchText) {
    this.form.controls['searchBox'].setErrors({'incorrect': true});
    this.showResults = searchText;
  }
}
