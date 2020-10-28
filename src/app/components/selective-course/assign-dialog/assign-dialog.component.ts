import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DepartmentService} from '../../../services/department.service';
import {Department} from '../../../models/Department';
import {Observable} from 'rxjs';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {FieldOfKnowledge} from '../../../models/FieldOfKnowledge';
import {FieldOfKnowledgeService} from '../../../services/field-of-knowledge.service';

@Component({
  selector: 'assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrls: ['./assign-dialog.component.scss']
})
export class AssignDialogComponent implements OnInit {
  form: FormGroup;
  studyYear: number;
  degreeId: number;
  prepType: any;
  courses = [];
  semester: number;

  fieldsOfKnowledge: FieldOfKnowledge[];
  departments: Department[];

  @Output() onAssign = new EventEmitter();

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef,
              private fieldOfKnowledgeService: FieldOfKnowledgeService,
              private departmentService: DepartmentService,
              private selectiveCourseService: SelectiveCourseService) {
    this.form = fb.group({
      knowledgeTypes: fb.array([]),
      selectiveCourses: fb.array([]),
    });
  }

  ngOnInit() {
    for (const course of this.courses) {
      const group = new FormGroup({
        department: new FormControl(),
        description: new FormControl(''),
        teacher: new FormControl(),
      });
      (<FormArray>this.form.get('selectiveCourses')).push(group);
    }

    this.fieldOfKnowledgeService.getFieldsOfKnowledge().subscribe(fieldsOfKnowledge => {
      this.fieldsOfKnowledge = fieldsOfKnowledge;

      for (const type of this.fieldsOfKnowledge) {
        (<FormArray>this.form.get('knowledgeTypes')).push(new FormControl(false));
      }
    });
    this.departmentService.getAllDepartments().subscribe(departments => {
      this.departments = departments.filter(department => department.abbr.length > 0);
    });
  }

  assign() {
    const trainingCycle = this.prepType.id === 2 ? 'PROFESSIONAL' : 'GENERAL';
    const fieldsOfKnowledge: number[] = [];

    for (let i = 0; i < this.fieldsOfKnowledge.length; i++) {
      const cb = this.form.get('knowledgeTypes').get(`${i}`);

      if (cb.value) {
        fieldsOfKnowledge.push(this.fieldsOfKnowledge[i].id);
      }
    }

    for (let i = 0; i < this.courses.length; i++) {
      const course = this.courses[i];
      const courseControl = this.form.get('selectiveCourses').get(`${i}`);

      const departmentId = courseControl.get('department').value;
      const description = courseControl.get('description').value;

      const teacherValue = courseControl.get('teacher').value;
      const teacher = teacherValue ? {
        id: courseControl.get('teacher').value,
      } : null;

      this.selectiveCourseService.createSelectiveCourse(this.studyYear, course.id, this.degreeId,
        departmentId, description, fieldsOfKnowledge, teacher, trainingCycle).subscribe(response => {
        this.onAssign.emit();
      }, error => {
        console.log(error);
      });
    }

    this.bsModalRef.hide();
  }
}
