import {Component, ElementRef, EventEmitter, forwardRef, OnInit, Output, ViewChild} from '@angular/core';
import {Teacher} from '../../../models/Teacher';
import {TeacherService} from '../../../services/teacher.service';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

@Component({
  selector: 'teacher-search',
  templateUrl: './teacher-search.component.html',
  styleUrls: ['./teacher-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeacherSearchComponent),
      multi: true
    }
  ]
})
export class TeacherSearchComponent implements OnInit, ControlValueAccessor {
  form: FormGroup;

  @Output() onTeacherSelect = new EventEmitter();
  teachers: Teacher[] = [];
  selectedTeacher: Teacher;
  searchText: string;
  showResults = false;

  constructor(private teacherService: TeacherService, private fb: FormBuilder) {
    this.form = fb.group({
      searchBox: new FormControl(this.searchText, []),
    });
  }

  onChange: any = () => {}
  onTouch: any = () => {}

  ngOnInit() {
    this.teacherService.getTeachersShort().subscribe(teachers => {
      this.teachers = teachers
    })
  }

  selectTeacher(teacher: Teacher) {
    this.showResults = false;
    this.selectedTeacher = teacher;
    if (teacher) {
      this.searchText = teacher.surname + ' ' + teacher.name + ' ' + teacher.patronimic;
    }
    this.onTeacherSelect.emit(teacher);
    this.onChange(teacher);
  }

  onSearchTextChange(searchText) {
    this.showResults = searchText.length > 0;

    if (searchText.length === 0) {
      this.form.controls['searchBox'].setErrors(null);
      this.onChange(null);
    } else {
      this.form.controls['searchBox'].setErrors({'incorrect': true});
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(teacher: Teacher): void {
    this.selectTeacher(teacher);
  }
}
