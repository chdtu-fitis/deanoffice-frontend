import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesForGroupsComponent } from './courses-for-groups.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StudiedCoursesComponent } from './studied-courses/studied-courses.component';
import { AddedCoursesComponent } from './added-courses/added-courses.component';
import { CourseCreationComponent } from './course-creation/course-creation.component';
import {CoursesSearchPipe} from '../../pipes/courses-search.pipe';
import { TeacherDialogComponent } from './teacher-dialog/teacher-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CopyCoursesDialogComponent } from './copy-courses-dialog/copy-courses-dialog.component';
import {TeacherSearchPipe} from '../../pipes/teacher-search.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../shared/shared.module';
import {GroupSearchPipe} from "../../pipes/group-search.pipe";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
    NgbModule.forRoot()
  ],
  declarations: [
    CoursesForGroupsComponent,
    StudiedCoursesComponent,
    AddedCoursesComponent,
    CourseCreationComponent,
    CoursesSearchPipe,
    TeacherSearchPipe,
    GroupSearchPipe,
    TeacherDialogComponent,
    CopyCoursesDialogComponent
  ],
  exports: [
    CoursesForGroupsComponent
  ]
})
export class CoursesForGroupsModule {
}
