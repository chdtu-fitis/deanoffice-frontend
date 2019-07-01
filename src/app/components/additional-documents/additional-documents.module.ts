import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

import {AdditionalDocumentsComponent} from './additional-documents.component';
import {SharedModule} from '../shared/shared.module';
import {PipeModule} from '../../pipes/pipe.module';

export const abstractRoutes: Routes = [
  {path: '', component: AdditionalDocumentsComponent}
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
  declarations: [AdditionalDocumentsComponent]
})
export class AdditionalDocumentsModule { }
