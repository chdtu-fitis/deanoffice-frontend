import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';

import {SpecialityComponent} from './speciality.component';
import {SharedModule} from '../shared/shared.module';

export const specialityRoutes: Routes = [
  {path: '', component: SpecialityComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(specialityRoutes),
    AgGridModule.withComponents([]),
  ],
  declarations: [SpecialityComponent]
})
export class SpecialityModule { }
