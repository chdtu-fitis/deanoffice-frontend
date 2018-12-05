import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { PersonalFileGradesStatementComponent } from './personal-file-grades-statement.component';
import { PipeModule } from '../../pipes/pipe.module';

const personalFileStatementComponentRoutes: Routes = [
  {
    path: '',
    component: PersonalFileGradesStatementComponent 
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PipeModule.forRoot(),
    RouterModule.forChild(personalFileStatementComponentRoutes)
  ],
  declarations: [ PersonalFileGradesStatementComponent ]
})
export class PersonalFileGradesStatementModule { }
