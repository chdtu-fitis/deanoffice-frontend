import {DashboardGuard, LoginGuard} from '../../services/auth/auth.guard';
import {Routes} from '@angular/router';

/**
 * При изменении роутинга не забывайте приводить актуальное состояние асоциативный массив "features"
 * в ../components/app/app.component.ts
 */

/**
 * Для подгрузки модулей используется Lazy Loading (Детские роуты находятся внутри файлов .module.ts).
 *
 * В случае, если после подключения нового модуля не будет работать Http interceptor для этого модуля, то нужно внутри
 * этого модуля вручную указать в провайдерах AppModule.tokenInterceptor()
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
