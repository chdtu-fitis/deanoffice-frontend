import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

import {SharedModule} from '../shared/shared.module';
import {PipeModule} from '../../pipes/pipe.module';
import { SimilarSubjectsComponent } from './similar-subjects/similar-subjects.component';

export const abstractRoutes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    redirectTo: 'similar-subjects',
  },
  {
    path: 'similar-subjects',
    component: SimilarSubjectsComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PipeModule.forRoot(),
    MatRadioModule,
    RouterModule.forChild(abstractRoutes)
  ],
  declarations: [SimilarSubjectsComponent]
})
export class AdministrationToolModule { }
