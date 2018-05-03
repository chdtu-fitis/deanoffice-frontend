import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupTableComponent } from './group-table/group-table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {GroupComponent} from './group.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    GroupTableComponent,
    GroupComponent
  ]
})
export class GroupModule { }
