import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesForGroupsComponent } from './courses-for-groups.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StudiedCoursesComponent } from './studied-courses/studied-courses.component';
import { AddedCoursesComponent } from './added-courses/added-courses.component';
import { CourseCreationComponent } from './course-creation/course-creation.component';
import {CoursesSearchPipe} from '../../pipes/courses-search.pipe';
import {LoadingComponent} from "../loading/loading.component";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CoursesForGroupsComponent,
    StudiedCoursesComponent,
    AddedCoursesComponent,
    CourseCreationComponent,
    CoursesSearchPipe,
    LoadingComponent
  ],
  exports: [
    CoursesForGroupsComponent
  ]
})
export class CoursesForGroupsModule {
}
