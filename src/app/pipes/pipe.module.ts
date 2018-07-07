import { NgModule } from '@angular/core';
import {CoursesSearchPipe} from './courses-search.pipe';
import {GroupSearchPipe} from './group-search.pipe';
import {TeacherSearchPipe} from './teacher-search.pipe';
import {EntriesPipe} from './entries.pipe';
import { ByStringPipe } from './by-string.pipe';

@NgModule({
  imports: [],
  declarations: [
    CoursesSearchPipe,
    GroupSearchPipe,
    TeacherSearchPipe,
    EntriesPipe,
    ByStringPipe
  ],
  exports: [
    CoursesSearchPipe,
    GroupSearchPipe,
    TeacherSearchPipe,
    EntriesPipe,
    ByStringPipe
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
        EntriesPipe,
        ByStringPipe
      ],
    };
  }
}
