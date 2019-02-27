import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsolidatedDocumentComponent } from './consolidated-document.component';
import { RouterModule, Routes } from '@angular/router';

export const consolidatedDocumentRoutes: Routes = [
  {path: '', component: ConsolidatedDocumentComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(consolidatedDocumentRoutes)
  ],
  declarations: [ConsolidatedDocumentComponent]
})
export class ConsolidatedDocumentModule { }
