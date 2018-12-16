import { ModuleWithProviders, NgModule } from '@angular/core';
import { CoursesSearchPipe } from './courses-search.pipe';
import { GroupSearchPipe } from './group-search.pipe';
import { TeacherSearchPipe } from './teacher-search.pipe';
import { EntriesPipe } from './entries.pipe';
import { ByStringPipe } from './by-string.pipe';
import { NameWithInitialsPipe } from './name-with-initials.pipe';

@NgModule({
  imports: [],
  declarations: [
    CoursesSearchPipe,
    GroupSearchPipe,
    TeacherSearchPipe,
    EntriesPipe,
    ByStringPipe,
    NameWithInitialsPipe
  ],
  exports: [
    CoursesSearchPipe,
    GroupSearchPipe,
    TeacherSearchPipe,
    EntriesPipe,
    ByStringPipe,
    NameWithInitialsPipe
  ]
})
export class PipeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PipeModule,
      providers: [
        CoursesSearchPipe,
        GroupSearchPipe,
        TeacherSearchPipe,
        EntriesPipe,
        ByStringPipe,
        NameWithInitialsPipe
      ]
    };
  }
}
