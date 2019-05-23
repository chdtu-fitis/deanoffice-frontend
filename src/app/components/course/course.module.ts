import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import { CourseComponent } from './course.component';
import {SharedModule} from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

export const courseRoutes: Routes = [
  {path: '', component: CourseComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule,
    RouterModule.forChild(courseRoutes)
  ],
  declarations: [CourseComponent]
})
export class CourseModule { }
