import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    SpecialityComponent,
    DiplomaSupplementComponent,
    ExamReportComponent,
    StudentsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DegreeService, GroupService, StudentService, DiplomaSupplementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
