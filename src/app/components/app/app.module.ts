import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from '../../routes/routes';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {GroupComponent} from '../group/group.component';
import {SpecialityComponent} from '../speciality/speciality.component';
import {DiplomaSupplementComponent} from '../diploma-supplement/diploma-supplement.component';
import {ExamReportComponent} from '../exam-report/exam-report.component';
import {DegreeService} from '../../services/degree.service';
import {GroupService} from '../../services/group.service';
import {StudentService} from '../../services/student.service';
import {DiplomaSupplementService} from '../../services/diploma-supplement.service';
import {CourseForGroupService} from '../../services/course-for-group.service';
import {GeneralService} from '../../services/general.service'
import {ExamReportService} from "../../services/exam-report.service";
import {GridModule} from '../grid/grid.module';
import {StudentsModule} from '../students/students.module';
import {SharedModule} from '../shared/shared.module';
import {GradeModule} from '../grade/grade.module';
import {GradeService} from '../../services/grade.service';
import {SpecialityService} from '../../services/speciality.service';
import {AuthenticationModule} from '../login/authentication.module';
import {FileService} from '../../services/file-service';

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
    AuthenticationModule,
    GradeModule
  ],
  providers: [
    DegreeService,
    GroupService,
    StudentService,
    DiplomaSupplementService,
    GeneralService,
    CourseForGroupService,
    ExamReportService,
    SpecialityService,
    FileService,
    GradeService,
    SpecialityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
