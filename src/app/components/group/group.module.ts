import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SimpleNotificationsModule } from 'angular2-notifications';

import {SharedModule} from '../shared/shared.module';
import {GroupComponent} from './group.component';
import {PipeModule} from '../../pipes/pipe.module';
import {AddGroupComponent} from './add-group/add-group.component';
import {DeleteGroupComponent} from './delete-group/delete-group.component';
import { UpdateGroupComponent } from './update-group/update-group.component';
import { GroupFormComponent } from './group-form/group-form.component';
import {MatSlideToggleModule} from '@angular/material';

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
    RouterModule.forChild(groupRoutes),
    SimpleNotificationsModule.forRoot(),
    MatSlideToggleModule,
  ],
  declarations: [
    AddGroupComponent,
    DeleteGroupComponent,
    GroupComponent,
    UpdateGroupComponent,
    GroupFormComponent
  ]
})
export class GroupModule { }
