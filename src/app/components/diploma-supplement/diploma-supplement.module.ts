import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {DiplomaSupplementComponent} from './diploma-supplement.component';
import { StudentsDataCheckComponent } from './students-data-check/students-data-check.component';
import { CoursesTranslationCheckComponent } from './courses-translation-check/courses-translation-check.component';

const diplomaSupplementRoutes: Routes = [
  {path: '', component: DiplomaSupplementComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(diplomaSupplementRoutes)
  ],
  declarations: [DiplomaSupplementComponent, StudentsDataCheckComponent, CoursesTranslationCheckComponent],
  entryComponents: [StudentsDataCheckComponent, CoursesTranslationCheckComponent]
})
export class DiplomaSupplementModule { }
