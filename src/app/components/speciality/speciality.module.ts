import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SpecialityComponent} from './speciality.component';
import {RouterModule} from '@angular/router';
import {specialityRoutes} from '../../routes/routes';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(specialityRoutes)
  ],
  declarations: [SpecialityComponent],
  exports: [RouterModule]
})
export class SpecialityModule { }
