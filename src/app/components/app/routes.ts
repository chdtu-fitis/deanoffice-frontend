import {DiplomaSupplementComponent} from '../diploma-supplement/diploma-supplement.component';
import {ExamReportComponent} from '../exam-report/exam-report.component';
import {StudentsComponent} from '../students/students.component';
import {CoursesForGroupsComponent} from '../courses-for-groups/courses-for-groups.component';
import {GradeComponent} from '../grade/grade.component';
import {ExpelledStudentsComponent} from '../students/expelled-students/expelled-students.component';
import {StudentsInVacationComponent} from '../students/students-in-vacation/students-in-vacation.component';
import {SpecialityComponent} from '../speciality/speciality.component';
import {LoginComponent} from '../login/login.component';
import {DashboardGuard, LoginGuard} from '../../services/auth/auth.guard';
import {GroupComponent} from '../group/group.component';
import {SpecializationComponent} from '../specialization/specialization.component';
import {Routes} from '@angular/router';

/**
 * При изменении роутинга не забывайте приводить актуальное состояние асоциативный массив "features"
 * в ../components/app/app.component.ts
 */
export const appRoutes: Routes = [
  {path: 'login', loadChildren: '../login/authentication.module#AuthenticationModule', canActivate: [LoginGuard]},
  {
    path: 'dashboard', canActivate: [DashboardGuard], children: [
      {
        path: 'documents', children: [
          {
            path: 'diploma-supplement',
            loadChildren: '../diploma-supplement/diploma-supplement.module#DiplomaSupplementModule'
          },
          {path: 'exam-report', loadChildren: '../exam-report/exam-report.module#ExamReportModule'}
        ]
      },
      {path: 'students', loadChildren: '../students/students.module#StudentsModule'},
      {path: 'grades', loadChildren: '../grade/grade.module#GradeModule'},
      {
        path: 'courses-for-groups',
        loadChildren: '../courses-for-groups/courses-for-groups.module#CoursesForGroupsModule'
      },
      {path: 'specialities', loadChildren: '../speciality/speciality.module#SpecialityModule'},
      {path: 'groups', loadChildren: '../group/group.module#GroupModule'},
      {path: 'specializations', loadChildren: '../specialization/specialization.module#SpecializationModule'}
    ]
  },
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];
