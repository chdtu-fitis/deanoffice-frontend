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
import {DashboardGuard, LoginGuard} from '../services/auth/auth.guard';
import {SpecializationComponent} from '../components/specialization/specialization.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {
    path: 'dashboard', canActivate: [DashboardGuard], children: [
      {
        path: 'documents', children: [
          {path: 'diploma-supplement', component: DiplomaSupplementComponent},
          {path: 'exam-report', component: ExamReportComponent}
        ]
      },
      {
        path: 'students', children: [
          {path: '', component: StudentsComponent},
          {path: 'expelled', component: ExpelledStudentsComponent},
          {path: 'in-vacation', component: StudentsInVacationComponent}
        ]
      },
      {path: 'grades', component: GradeComponent},
      {path: 'courses-for-groups', component: CoursesForGroupsComponent},
      {path: 'specialities', component: SpecialityComponent},
      {path: 'specializations', component: SpecializationComponent}
    ]
  },
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
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
