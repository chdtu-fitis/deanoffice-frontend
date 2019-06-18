import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common'

import {FinishStudyYearComponent} from './finish-study-year.component';
import {SharedModule} from '../shared/shared.module';
import {PipeModule} from '../../pipes/pipe.module';
import { GroupsTableComponent } from './groups-table/groups-table.component';

export const finishStudyYearRoutes: Routes = [
  {path: '', component: FinishStudyYearComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PipeModule.forRoot(),
    RouterModule.forChild(finishStudyYearRoutes)
  ],
  declarations: [FinishStudyYearComponent, GroupsTableComponent]
})
export class FinishStudyYearModule { }
