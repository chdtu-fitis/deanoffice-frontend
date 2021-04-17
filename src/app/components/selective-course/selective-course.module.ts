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
  ],
  declarations: [SelectiveCourseComponent, AssignDialogComponent, TeacherSearchComponent, AssignedCoursesComponent, CopyDialogComponent, RegisteredStudentsComponent, EditDialogComponent, SelectiveCourseFormComponent, YearParametersDialogComponent],
  entryComponents: [AssignDialogComponent, CopyDialogComponent, EditDialogComponent, YearParametersDialogComponent]
})
export class SelectiveCourseModule {
}
