import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap';

import {GroupComponent} from '../group/group.component';
import {SpecialityComponent} from '../speciality/speciality.component';
import {DiplomaSupplementComponent} from '../diploma-supplement/diploma-supplement.component';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../../routes/routes';
import {HttpClientModule} from '@angular/common/http';
import {DegreeService} from '../../services/degree.service';
import {GroupService} from '../../services/group.service';
import {StudentService} from '../../services/student.service';
import {DiplomaSupplementService} from '../../services/diploma-supplement.service';
import {AppComponent} from './app.component';
import { ExamReportComponent } from '../exam-report/exam-report.component';
import { StudentsComponent } from '../students/students.component';
import { StudentColumnsComponent } from '../students/student-columns/student-columns.component';
import { EntriesPipe } from '../../pipes/entries.pipe';
import { ModalComponent } from '../modal/modal.component';
import { StudentsTableComponent } from '../students/students-table/students-table.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    SpecialityComponent,
    DiplomaSupplementComponent,
    ExamReportComponent,
    StudentsComponent,
    StudentColumnsComponent,
    EntriesPipe,
    ModalComponent,
    StudentsTableComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
  ],
  providers: [DegreeService, GroupService, StudentService, DiplomaSupplementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
