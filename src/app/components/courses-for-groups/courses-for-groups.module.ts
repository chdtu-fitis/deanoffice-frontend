import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import {SharedModule} from '../shared/shared.module';
import {AuthenticationModule} from '../login/authentication.module';
import {PipeModule} from '../../pipes/pipe.module';

import { CoursesForGroupsComponent } from './courses-for-groups.component';
import { AddedCoursesComponent } from './added-courses/added-courses.component';
import { CourseCreationComponent } from './course-creation/course-creation.component';
import { TeacherDialogComponent } from './teacher-dialog/teacher-dialog.component';
import { CopyCoursesDialogComponent } from './copy-courses-dialog/copy-courses-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import {GroupsDifferentDialogComponent} from './groups-different-dialog/groups-different-dialog.component';

const coursesForGroupsRoutes: Routes = [
  {path: '', component: CoursesForGroupsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PipeModule,
    RouterModule.forChild(coursesForGroupsRoutes),
    TypeaheadModule.forRoot()
  ],
  declarations: [
    CoursesForGroupsComponent,
    AddedCoursesComponent,
    CourseCreationComponent,
    TeacherDialogComponent,
    CopyCoursesDialogComponent,
    EditDialogComponent,
    GroupsDifferentDialogComponent
  ],
  entryComponents: [
    EditDialogComponent,
    CopyCoursesDialogComponent,
    TeacherDialogComponent,
    GroupsDifferentDialogComponent
  ],
  providers: [AuthenticationModule.tokenInterceptor()]
})
export class CoursesForGroupsModule {
}
