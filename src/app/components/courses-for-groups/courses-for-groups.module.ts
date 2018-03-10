import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesForGroupsComponent } from './courses-for-groups.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { StudiedCoursesComponent } from './studied-courses/studied-courses.component';
import { AddedCoursesComponent } from './added-courses/added-courses.component';
import { CourseCreationComponent } from './course-creation/course-creation.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    CoursesForGroupsComponent,
    StudiedCoursesComponent,
    AddedCoursesComponent,
    CourseCreationComponent
  ],
  exports: [
    CoursesForGroupsComponent
  ]
})
export class CoursesForGroupsModule {
}
