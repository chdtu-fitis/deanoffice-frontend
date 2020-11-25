import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SelectiveCourse} from '../../../models/SelectiveCourse';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FieldOfKnowledgeService} from '../../../services/field-of-knowledge.service';
import {DepartmentService} from '../../../services/department.service';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {Form, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {FieldOfKnowledge} from '../../../models/FieldOfKnowledge';
import {Department} from '../../../models/Department';

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

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef,
              private fieldOfKnowledgeService: FieldOfKnowledgeService,
              private departmentService: DepartmentService,
              private selectiveCourseService: SelectiveCourseService) {
    this.form = fb.group({
      knowledgeTypes: fb.array([]),
      department: new FormControl(),
      description: new FormControl(),
      teacher: new FormControl(),
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
      this.form.controls['department'].setValue(this.selectiveCourse.department.id);
    });

    this.form.controls['description'].setValue(this.selectiveCourse.description);
    this.form.controls['teacher'].setValue(this.selectiveCourse.teacher);
  }

  edit() {
    const fieldsOfKnowledge: number[] = [];

    for (let i = 0; i < this.fieldsOfKnowledge.length; i++) {
      const cb = this.form.get('knowledgeTypes').get(`${i}`);
      if (cb.value) {
        fieldsOfKnowledge.push(this.fieldsOfKnowledge[i].id);
      }
    }

    const departmentId = this.form.get('department').value;
    const description = this.form.get('description').value;

    const teacherValue = this.form.get('teacher').value;
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
    };

    this.selectiveCourseService.updateSelectiveCourse(this.selectiveCourse.id, body).subscribe(() => {
      this.onEdit.emit();
    }, error => {
      console.log(body, error);
    });

    this.bsModalRef.hide();
  }

}
