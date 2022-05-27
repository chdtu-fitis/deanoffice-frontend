import { NgModule } from '@angular/core';
import {CoursesSearchPipe} from './courses-search.pipe';
import {GroupSearchPipe} from './group-search.pipe';
import {TeacherSearchPipe} from './teacher-search.pipe';
import {EntriesPipe} from './entries.pipe';
import { ByStringPipe } from './by-string.pipe';
import {NameWithInitialsPipe} from './name-with-initials.pipe';
import { MapsKeysPipe } from './maps-keys.pipe';
import { AbbreviatedNamePipe } from './abbreviated-name.pipe';
import {ShortenedPipe} from "./shortened.pipe";
import { TypeOfEducationPipe } from './type-of-education.pipe';
import {StudentsSearchPipe} from './students-search.pipe';
import {CoursesSearchTrainingCyclePipe} from './courses-searc-training-cycle.pipe';

@NgModule({
  imports: [],
  declarations: [
    CoursesSearchPipe,
    GroupSearchPipe,
    TeacherSearchPipe,
    EntriesPipe,
    ByStringPipe,
    NameWithInitialsPipe,
    MapsKeysPipe,
    AbbreviatedNamePipe,
    ShortenedPipe,
    TypeOfEducationPipe,
    StudentsSearchPipe,
    CoursesSearchTrainingCyclePipe,
  ],
  exports: [
    CoursesSearchPipe,
    GroupSearchPipe,
    TeacherSearchPipe,
    EntriesPipe,
    ByStringPipe,
    NameWithInitialsPipe,
    MapsKeysPipe,
    AbbreviatedNamePipe,
    ShortenedPipe,
    TypeOfEducationPipe,
    StudentsSearchPipe,
    CoursesSearchTrainingCyclePipe,
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
        ByStringPipe,
        NameWithInitialsPipe,
        StudentsSearchPipe,
        CoursesSearchTrainingCyclePipe,
      ],
    };
  }
}
