import {DiplomaSupplementComponent} from '../components/diploma-supplement/diploma-supplement.component';
import {ExamReportComponent} from '../components/exam-report/exam-report.component';
import {StudentsComponent} from '../components/students/students.component';
import {CoursesForGroupsComponent} from '../components/courses-for-groups/courses-for-groups.component';
import {GradeComponent} from '../components/grade/grade.component';
import {ExpelledStudentsComponent} from '../components/students/expelled-students/expelled-students.component';
import {StudentsInVacationComponent} from '../components/students/students-in-vacation/students-in-vacation.component';
import {SpecialityComponent} from '../components/speciality/speciality.component';
import {LoginComponent} from '../components/login/login.component';
import {DashboardGuard, LoginGuard} from '../services/auth/auth.guard';
import {GroupComponent} from '../components/group/group.component';
import {SpecializationComponent} from '../components/specialization/specialization.component';
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
          {path: 'diploma-supplement', component: DiplomaSupplementComponent},
          {path: 'exam-report', component: ExamReportComponent}
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

export const authRoutes: Routes = [
  {path: '', component: LoginComponent}
];

export const studentRoutes: Routes = [
  {path: '', component: StudentsComponent},
  {path: 'expelled', component: ExpelledStudentsComponent},
  {path: 'in-vacation', component: StudentsInVacationComponent}
];

export const gradeRoutes: Routes = [
  {path: '', component: GradeComponent}
];

export const specialityRoutes: Routes = [
  {path: '', component: SpecialityComponent}
];

export const coursesForGroupsRoutes: Routes = [
  {path: '', component: CoursesForGroupsComponent}
];

export const groupRoutes: Routes = [
  {path: '', component: GroupComponent}
];

export const specializationRoutes: Routes = [
  {path: '', component: SpecializationComponent}
];
