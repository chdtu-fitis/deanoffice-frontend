import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

import {SharedModule} from '../shared/shared.module';
import {PipeModule} from '../../pipes/pipe.module';
import { SimilarSubjectsComponent } from './similar-subjects/similar-subjects.component';
import { CourseNameCleaningComponent } from './course-name-cleaning/course-name-cleaning.component';
import { FixWrongCreditsComponent } from './fix-wrong-credits/fix-wrong-credits.component';

export const abstractRoutes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    redirectTo: 'similar-subjects',
  },
  {
    path: 'similar-subjects',
    component: SimilarSubjectsComponent,
  },
  {
    path: 'course-name-cleaning',
    component: CourseNameCleaningComponent,
  },
  {
    path: 'wrong-credits',
    component: FixWrongCreditsComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PipeModule.forRoot(),
    MatRadioModule,
    RouterModule.forChild(abstractRoutes),
  ],
  declarations: [
    SimilarSubjectsComponent,
    FixWrongCreditsComponent,
    CourseNameCleaningComponent,
  ]
})
export class AdministrationToolModule { }
