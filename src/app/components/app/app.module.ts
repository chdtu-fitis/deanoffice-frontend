import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';

import {PipeModule} from '../../pipes/pipe.module';
import {AuthenticationModule} from '../login/authentication.module';
import {SharedModule} from '../shared/shared.module';

import {DashboardGuard, LoginGuard} from '../../services/auth/auth.guard';

import {SpecializationService} from '../../services/specialization.service';
import {DepartmentService} from '../../services/department.service';
import {GradeService} from '../../services/grade.service';
import {SpecialityService} from '../../services/speciality.service';
import {FileService} from '../../services/file-service';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {DegreeService} from '../../services/degree.service';
import {GroupService} from '../../services/group.service';
import {StudentService} from '../../services/student.service';
import {DiplomaSupplementService} from '../../services/diploma-supplement.service';
import {CourseForGroupService} from '../../services/course-for-group.service';
import {GeneralService} from '../../services/general.service'
import {ExamReportService} from '../../services/exam-report.service';

import {appRoutes} from './app-routes';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    PipeModule
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
    SpecialityService,
    SpecializationService,
    DepartmentService,
    AuthenticationService,
    DashboardGuard,
    LoginGuard,
    AuthenticationModule.tokenInterceptor()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
