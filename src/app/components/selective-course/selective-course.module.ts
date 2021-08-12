import {NgModule} from '@angular/core';
import {SelectiveCourseComponent} from './selective-course.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {PipeModule} from '../../pipes/pipe.module';
import {AssignDialogComponent} from './assign-dialog/assign-dialog.component';
import {TeacherSearchComponent} from './teacher-search/teacher-search.component';
import {AssignedCoursesComponent} from './assigned-courses/assigned-courses.component';
import {CopyDialogComponent} from './copy-dialog/copy-dialog.component';
import {RegisteredStudentsComponent} from './registered-students/registered-students.component';
import {EditDialogComponent} from './edit-dialog/edit-dialog.component';
import {SelectiveCourseFormComponent} from './selective-course-form/selective-course-form.component';
import { YearParametersDialogComponent } from './year-parameters-dialog/year-parameters-dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { YearParametersTableComponent } from './year-parameters-table/year-parameters-table.component';
import { EditStudentDialogComponent } from './edit-student-dialog/edit-student-dialog.component';
import { StudentCoursesTableComponent } from './edit-student-dialog/student-courses-table/student-courses-table.component';
import {TypeaheadModule} from "ngx-bootstrap/typeahead";

export const selectiveCourseRoutes: Routes = [
  {path: '', component: SelectiveCourseComponent}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        PipeModule.forRoot(),
        RouterModule.forChild(selectiveCourseRoutes),
        MatTooltipModule,
        TypeaheadModule.forRoot()
    ],
  declarations: [SelectiveCourseComponent, AssignDialogComponent, TeacherSearchComponent, AssignedCoursesComponent, CopyDialogComponent, RegisteredStudentsComponent, EditDialogComponent, SelectiveCourseFormComponent, YearParametersDialogComponent, YearParametersTableComponent, EditStudentDialogComponent, StudentCoursesTableComponent],
  entryComponents: [AssignDialogComponent, CopyDialogComponent, EditDialogComponent, YearParametersDialogComponent, EditStudentDialogComponent]
})
export class SelectiveCourseModule {
}
