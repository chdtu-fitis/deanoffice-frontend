import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {HeaderComponent} from './header/header.component';
import {AppComponent} from './app.component';
import {GroupComponent} from '../group/group.component';
import {SpecialityComponent} from '../speciality/speciality.component';
import {DiplomaSupplementComponent} from '../diploma-supplement/diploma-supplement.component';
import {AppRoutingModule} from '../../routes/routes';
import {DegreeService} from '../../services/degree.service';
import {GroupService} from '../../services/group.service';
import {StudentService} from '../../services/student.service';
import {GridModule} from '../grid/grid.module';
import {ExamReportComponent} from '../exam-report/exam-report.component';
import {DiplomaSupplementService} from '../../services/diploma-supplement.service';
import {StudentsModule} from '../students/students.module';
import {SharedModule} from '../shared/shared.module';
import {CourseForGroupService} from '../../services/course-for-group.service';
import {GeneralService} from '../../services/general.service'
import {ExamReportService} from "../../services/exam-report.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GroupComponent,
    SpecialityComponent,
    DiplomaSupplementComponent,
    ExamReportComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    GridModule,
    StudentsModule,
    SharedModule,
  ],
  providers: [
    GeneralService,
    DegreeService,
    GroupService,
    StudentService,
    CourseForGroupService,
    DiplomaSupplementService,
    ExamReportService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
