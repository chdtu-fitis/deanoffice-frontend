import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesForGroupsComponent } from './courses-for-groups.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StudiedCoursesComponent } from './studied-courses/studied-courses.component';
import { AddedCoursesComponent } from './added-courses/added-courses.component';
import { CourseCreationComponent } from './course-creation/course-creation.component';
import { TeacherDialogComponent } from './teacher-dialog/teacher-dialog.component';
import { CopyCoursesDialogComponent } from './copy-courses-dialog/copy-courses-dialog.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../shared/shared.module';
import {PipeModule} from '../../pipes/pipe.module';
import {RouterModule} from '@angular/router';
import {coursesForGroupsRoutes} from '../../routes/routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule.forRoot(),
    PipeModule,
    RouterModule.forChild(coursesForGroupsRoutes)
  ],
  declarations: [
    CoursesForGroupsComponent,
    StudiedCoursesComponent,
    AddedCoursesComponent,
    CourseCreationComponent,
    TeacherDialogComponent,
    CopyCoursesDialogComponent
  ],
  exports: [RouterModule]
})
export class CoursesForGroupsModule {
}
