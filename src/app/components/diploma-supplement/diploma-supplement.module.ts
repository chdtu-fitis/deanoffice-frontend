import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {DiplomaSupplementComponent} from './diploma-supplement.component';

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
  declarations: [DiplomaSupplementComponent]
})
export class DiplomaSupplementModule { }
