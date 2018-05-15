import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoursesSearchPipe} from './courses-search.pipe';
import {GroupSearchPipe} from './group-search.pipe';
import {TeacherSearchPipe} from './teacher-search.pipe';
import {EntriesPipe} from './entries.pipe';

@NgModule({
  imports: [],
  declarations: [
    CoursesSearchPipe,
    GroupSearchPipe,
    TeacherSearchPipe,
    EntriesPipe
  ],
  exports: [
    CoursesSearchPipe,
    GroupSearchPipe,
    TeacherSearchPipe,
    EntriesPipe
  ]
})
 export class PipeModule {
  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [
        CoursesSearchPipe,
        GroupSearchPipe,
        TeacherSearchPipe,
        EntriesPipe
      ],
    };
  }
}
