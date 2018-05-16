import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {appRoutes} from '../../routes/routes';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {SpecialityComponent} from '../speciality/speciality.component';
import {DiplomaSupplementComponent} from '../diploma-supplement/diploma-supplement.component';
import {ExamReportComponent} from '../exam-report/exam-report.component';
import {DegreeService} from '../../services/degree.service';
import {GroupService} from '../../services/group.service';
import {StudentService} from '../../services/student.service';
import {DiplomaSupplementService} from '../../services/diploma-supplement.service';
import {CourseForGroupService} from '../../services/course-for-group.service';
import {GeneralService} from '../../services/general.service'
import {ExamReportService} from '../../services/exam-report.service';
import {SharedModule} from '../shared/shared.module';
import {GradeService} from '../../services/grade.service';
import {SpecialityService} from '../../services/speciality.service';
import {FileService} from '../../services/file-service';
import {GroupModule} from '../group/group.module';
import {SpecializationService} from '../../services/specialization.service';
import {DepartmentService} from '../../services/department.service';
import {PipeModule} from '../../pipes/pipe.module';
import {RouterModule} from '@angular/router';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {DashboardGuard, LoginGuard} from '../../services/auth/auth.guard';
import {TokenInterceptor} from '../../services/auth/token.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExamReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    PipeModule,
    RouterModule.forRoot(appRoutes)
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
