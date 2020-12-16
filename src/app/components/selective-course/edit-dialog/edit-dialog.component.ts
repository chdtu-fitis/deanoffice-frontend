import {Component, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SelectiveCourse} from '../../../models/SelectiveCourse';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FieldOfKnowledgeService} from '../../../services/field-of-knowledge.service';
import {DepartmentService} from '../../../services/department.service';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {FieldOfKnowledge} from '../../../models/FieldOfKnowledge';
import {Department} from '../../../models/Department';
import {SelectiveCourseFormComponent} from '../selective-course-form/selective-course-form.component';

@Component({
  selector: 'edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  private form: FormGroup;
  selectiveCourse: SelectiveCourse;

  fieldsOfKnowledge: FieldOfKnowledge[];
  departments: Department[];

  @Output() onEdit = new EventEmitter();

  @ViewChild('selectiveCourseForm', {static: true}) selectiveCourseForm: SelectiveCourseFormComponent;

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
        let enabled = false;
        if (this.selectiveCourse.fieldsOfKnowledge) {
          enabled = this.selectiveCourse.fieldsOfKnowledge.findIndex(item => item.id === type.id) !== -1;
        }
        (<FormArray>this.form.get('knowledgeTypes')).push(new FormControl(enabled));
      }
    });
    this.departmentService.getAllDepartments().subscribe(departments => {
      this.departments = departments.filter(department => department.abbr.length > 0);
      this.selectiveCourseForm.departments = this.departments;
      this.selectiveCourseForm.departmentId = this.selectiveCourse.department.id;
    });

    this.selectiveCourseForm.teacher.selectTeacher(this.selectiveCourse.teacher);
    this.selectiveCourseForm.description = this.selectiveCourse.description;
    this.selectiveCourseForm.groupName = this.selectiveCourse.groupName;
  }

  update() {
    const fieldsOfKnowledge: number[] = [];

    for (let i = 0; i < this.fieldsOfKnowledge.length; i++) {
      const cb = this.form.get('knowledgeTypes').get(`${i}`);
      if (cb.value) {
        fieldsOfKnowledge.push(this.fieldsOfKnowledge[i].id);
      }
    }

    const departmentId = this.selectiveCourseForm.departmentId;
    const description = this.selectiveCourseForm.description ? this.selectiveCourseForm.description : '';

    const teacherValue = this.selectiveCourseForm.teacher.selectedTeacher;
    const teacher = teacherValue ? {id: teacherValue.id} : null;

    const body = {
      available: true,
      course: {id: this.selectiveCourse.course.id},
      degree: {id: this.selectiveCourse.degree.id},
      department: {id: departmentId},
      description: description,
      fieldsOfKnowledge: fieldsOfKnowledge,
      studyYear: this.selectiveCourse.studyYear,
      teacher: teacher,
      trainingCycle: this.selectiveCourse.trainingCycle,
      groupName: this.selectiveCourseForm.groupName,
    };

    this.selectiveCourseService.updateSelectiveCourse(this.selectiveCourse.id, body).subscribe(() => {
      this.onEdit.emit();
    }, error => {
      console.log(body, error);
    });

    this.bsModalRef.hide();
  }
}
