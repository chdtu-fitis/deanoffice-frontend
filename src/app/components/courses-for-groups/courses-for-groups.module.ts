import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesForGroupsComponent } from './courses-for-groups.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StudiedCoursesComponent } from './studied-courses/studied-courses.component';
import { AddedCoursesComponent } from './added-courses/added-courses.component';
import { CourseCreationComponent } from './course-creation/course-creation.component';
import { TeacherDialogComponent } from './teacher-dialog/teacher-dialog.component';
import { CopyCoursesDialogComponent } from './copy-courses-dialog/copy-courses-dialog.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../shared/shared.module';
import {PipeModule} from '../../pipes/pipe.module';
import {RouterModule, Routes} from '@angular/router';
import {AppModule} from '../app/app.module';
import {SimpleNotificationsModule} from 'angular2-notifications';

const coursesForGroupsRoutes: Routes = [
  {path: '', component: CoursesForGroupsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule.forRoot(),
    PipeModule,
    RouterModule.forChild(coursesForGroupsRoutes),
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    CoursesForGroupsComponent,
    StudiedCoursesComponent,
    AddedCoursesComponent,
    CourseCreationComponent,
    TeacherDialogComponent,
    CopyCoursesDialogComponent
  ],
  providers: [AppModule.tokenInterceptor()]
})
export class CoursesForGroupsModule {
}
