import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupTableComponent } from './group-table/group-table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {GroupComponent} from './group.component';
import {PipeModule} from '../../pipes/pipe.module';
import {RouterModule, Routes} from '@angular/router';

export const groupRoutes: Routes = [
  {path: '', component: GroupComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PipeModule.forRoot(),
    RouterModule.forChild(groupRoutes)
  ],
  declarations: [
    GroupTableComponent,
    GroupComponent
  ],
  exports: [RouterModule]
})
export class GroupModule { }
