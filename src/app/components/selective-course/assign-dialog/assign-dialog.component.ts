import {Component, EventEmitter, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DepartmentService} from '../../../services/department.service';
import {Department} from '../../../models/Department';
import {Observable} from 'rxjs';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {FieldOfKnowledge} from '../../../models/FieldOfKnowledge';
import {FieldOfKnowledgeService} from '../../../services/field-of-knowledge.service';
import {SelectiveCourseFormComponent} from '../selective-course-form/selective-course-form.component';

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

  @ViewChildren('selectiveCourseForm') selectiveCourseForms: QueryList<SelectiveCourseFormComponent>;

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef,
              private fieldOfKnowledgeService: FieldOfKnowledgeService,
              private departmentService: DepartmentService,
              private selectiveCourseService: SelectiveCourseService) {
    this.form = fb.group({
      knowledgeTypes: fb.array([]),
    });
  }

  ngOnInit() {
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
    const selectiveCourseForms = this.selectiveCourseForms.toArray();

    const trainingCycle = this.prepType.id === 2 ? 'PROFESSIONAL' : 'GENERAL';
    const fieldsOfKnowledge: number[] = [];

    for (let i = 0; i < this.fieldsOfKnowledge.length; i++) {
      const cb = this.form.get('knowledgeTypes').get(`${i}`);

      if (cb.value) {
        fieldsOfKnowledge.push(this.fieldsOfKnowledge[i].id);
      }
    }

    for (let i = 0; i < this.selectiveCourseForms.length; i++) {
      const course = this.courses[i];
      const courseControl = selectiveCourseForms[i];

      const departmentId = courseControl.departmentId;
      const description = courseControl.description;

      const teacherValue = courseControl.teacher.selectedTeacher;
      const teacher = teacherValue ? {
        id: teacherValue.id,
      } : null;

      const body = {
        available: true,
        course: {id: course.id},
        degree: {id: this.degreeId},
        department: {id: departmentId},
        description: description,
        fieldsOfKnowledge: fieldsOfKnowledge,
        studyYear: this.studyYear,
        teacher: teacher,
        trainingCycle: trainingCycle,
        groupName: courseControl.groupName,
      };

      this.selectiveCourseService.createSelectiveCourse(body).subscribe(() => {
        this.onAssign.emit();
      }, error => {
        console.log(body, error);
      });
    }

    this.bsModalRef.hide();
  }
}
