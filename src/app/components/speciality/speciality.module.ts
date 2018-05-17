import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SpecialityComponent} from './speciality.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

export const specialityRoutes: Routes = [
  {path: '', component: SpecialityComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(specialityRoutes)
  ],
  declarations: [SpecialityComponent]
})
export class SpecialityModule { }
