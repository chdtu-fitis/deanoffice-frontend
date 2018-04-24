import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DiplomaSupplementComponent} from '../components/diploma-supplement/diploma-supplement.component';
import {ExamReportComponent} from '../components/exam-report/exam-report.component';
import {StudentsComponent} from '../components/students/students.component';
import {CoursesForGroupsModule} from '../components/courses-for-groups/courses-for-groups.module';
import {CoursesForGroupsComponent} from '../components/courses-for-groups/courses-for-groups.component';
import {GradeComponent} from '../components/grade/grade.component';
import {ExpelledStudentsComponent} from '../components/students/expelled-students/expelled-students.component';
import {StudentsInVacationComponent} from '../components/students/students-in-vacation/students-in-vacation.component';
import {SpecialityComponent} from '../components/speciality/speciality.component';
import {LoginComponent} from '../components/login/login.component';
import {AuthGuard} from '../services/auth/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'diploma-supplement', component: DiplomaSupplementComponent, canActivate: [AuthGuard]},
  {path: 'examreport', component: ExamReportComponent, canActivate: [AuthGuard]},
  {path: 'students', component: StudentsComponent, canActivate: [AuthGuard]},
  {path: 'grades', component: GradeComponent, canActivate: [AuthGuard]},
  {path: 'expelled', component: ExpelledStudentsComponent, canActivate: [AuthGuard]},
  {path: 'in-vacation', component: StudentsInVacationComponent, canActivate: [AuthGuard]},
  {path: 'courses-for-groups', component: CoursesForGroupsComponent, canActivate: [AuthGuard]},
  {path: 'specialities', component: SpecialityComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CoursesForGroupsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
