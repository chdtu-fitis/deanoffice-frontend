import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {diplomaSupplementRoutes} from '../../routes/routes';
import {DiplomaSupplementComponent} from './diploma-supplement.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(diplomaSupplementRoutes)
  ],
  declarations: [DiplomaSupplementComponent],
  exports: [RouterModule]
})
export class DiplomaSupplementModule { }
