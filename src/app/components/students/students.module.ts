import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';

import {StudentsComponent} from './students.component';
import {StudentsTableComponent} from './students-table/students-table.component';
import {StudentsColumnsComponent} from './students-columns/students-columns.component';
import {SharedModule} from '../shared/shared.module';
import {AddStudentComponent} from './add-student/add-student.component';
import {StudentTypeaheadComponent} from './student-typeahead/student-typeahead.component';
import {StudentPersonalInfoComponent} from './student-personal-info/student-personal-info.component';
import {StudentsFiltersComponent} from './students-filters/students-filters.component';
import {StudentsSearchComponent} from './students-search/students-search.component';
import {PhotoUploadComponent} from './photo-upload/photo-upload.component';
import {StudentExpelComponent} from './student-expel/student-expel.component';
import {StudentsListComponent} from './students-list/students-list.component';
import {StudentDegreeInfoComponent} from './student-degree-info/student-degree-info.component';
import {ExpelledStudentsComponent} from './expelled-students/expelled-students.component';
import {StudentsInVacationComponent} from './students-in-vacation/students-in-vacation.component';
import {RenewStudentComponent} from './renew-student/renew-student.component';
import {StopAcademicVacationComponent} from './stop-academic-vacation/stop-academic-vacation.component';
import {StudentAcademicVacationComponent} from './student-academic-vacation/student-academic-vacation.component';
import {PipeModule} from '../../pipes/pipe.module';
import {RouterModule, Routes} from '@angular/router';
import {SynchronizeWithEdeboComponent} from './synchronize-with-edebo/synchronize-with-edebo.component';
import { AssignStudentsToGroupComponent } from './assign-students-to-group/assign-students-to-group.component';
import { AssignRecordBookNumberToStudentsComponent } from './assign-record-book-number-to-students/assign-record-book-number-to-students.component';

export const studentRoutes: Routes = [
  {path: '', component: StudentsComponent},
  {path: 'expelled', component: ExpelledStudentsComponent, data: { title: 'Відраховані студенти' }},
  {path: 'in-vacation', component: StudentsInVacationComponent, data: { title: 'Студенти в академ. відпустці' }}
];

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsTableComponent,
    StudentsColumnsComponent,
    AddStudentComponent,
    StudentTypeaheadComponent,
    StudentsFiltersComponent,
    StudentsSearchComponent,
    StudentExpelComponent,
    StudentsListComponent,
    StudentPersonalInfoComponent,
    PhotoUploadComponent,
    StudentDegreeInfoComponent,
    ExpelledStudentsComponent,
    StudentsInVacationComponent,
    RenewStudentComponent,
    StopAcademicVacationComponent,
    StudentAcademicVacationComponent,
    AssignStudentsToGroupComponent,
    AssignRecordBookNumberToStudentsComponent,
    SynchronizeWithEdeboComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TabsModule.forRoot(),
    TypeaheadModule.forRoot(),
    RouterModule.forChild(studentRoutes),
    PipeModule
  ]
})
export class StudentsModule {}
