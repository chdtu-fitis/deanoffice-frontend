import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import { CourseComponent } from './course.component';
import {SharedModule} from '../shared/shared.module';

export const courseRoutes: Routes = [
  {path: '', component: CourseComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(courseRoutes)
  ],
  declarations: [CourseComponent]
})
export class CourseModule { }
