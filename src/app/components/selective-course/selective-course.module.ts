import {NgModule} from '@angular/core';
import {SelectiveCourseComponent} from './selective-course.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {PipeModule} from '../../pipes/pipe.module';
import {AssignDialogComponent} from './assign-dialog/assign-dialog.component';

export const selectiveCourseRoutes: Routes = [
  {path: '', component: SelectiveCourseComponent}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PipeModule.forRoot(),
    RouterModule.forChild(selectiveCourseRoutes),
  ],
  declarations: [SelectiveCourseComponent, AssignDialogComponent],
  entryComponents: [AssignDialogComponent]
})
export class SelectiveCourseModule {
}
