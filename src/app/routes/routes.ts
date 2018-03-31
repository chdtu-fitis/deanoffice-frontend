import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DiplomaSupplementComponent} from '../components/diploma-supplement/diploma-supplement.component';
import {ExamReportComponent} from '../components/exam-report/exam-report.component';
import {GridComponent} from '../components/grid/grid.component';
import {LoginComponent} from '../components/login/login.component';
import {AuthGuard} from '../services/auth/auth.guard';
import {StudentsComponent} from '../components/students/students.component';
import {CoursesForGroupsComponent} from "../components/courses-for-groups/courses-for-groups.component";
import {CoursesForGroupsModule} from "../components/courses-for-groups/courses-for-groups.module";

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'diplsuppl', component: DiplomaSupplementComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  {path: 'examreport', component: ExamReportComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  {path: 'test', component: GridComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  {path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },
  {path: '', component: DiplomaSupplementComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  {path: 'courses-for-groups', component: CoursesForGroupsComponent, canActivate: [AuthGuard] }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
      CoursesForGroupsModule
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
