import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsolidatedDocumentComponent } from './consolidated-document.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PipeModule } from '../../pipes/pipe.module';

export const consolidatedDocumentRoutes: Routes = [
  { path: '', component: ConsolidatedDocumentComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PipeModule.forRoot(),
    RouterModule.forChild(consolidatedDocumentRoutes),
  ],
  declarations: [ConsolidatedDocumentComponent]
})
export class ConsolidatedDocumentModule { }
