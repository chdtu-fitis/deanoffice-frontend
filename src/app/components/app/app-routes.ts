import {DashboardGuard, LoginGuard} from '../../services/auth/auth.guard';
import {Routes} from '@angular/router';


/**
 * Для подгрузки модулей используется Lazy Loading (Детские роуты находятся внутри файлов .module.ts).
 *
 * В случае, если после подключения нового модуля не будет работать Http interceptor для этого модуля, то нужно внутри
 * этого модуля вручную указать в провайдерах AppModule.tokenInterceptor()
 */

export const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: '../login/authentication.module#AuthenticationModule',
    canActivate: [LoginGuard],
    data: { title: 'Вхід' }
  },
  {
    path: 'dashboard', canActivate: [DashboardGuard], data: { title: 'Головна' }, children: [
      {
        path: 'documents', children: [
          {
            path: 'diploma-supplement',
            loadChildren: '../diploma-supplement/diploma-supplement.module#DiplomaSupplementModule',
            data: { title: 'Додатки до диплому' }
          },
          {
            path: 'exam-report',
            loadChildren: '../exam-report/exam-report.module#ExamReportModule',
            data: { title: 'Відомості' }
          },
          {
            path: 'consolidated-exam-report',
            loadChildren: '../consolidated-exam-report/consolidated-exam-report.module#ConsolidatedExamReportModule',
            data: { title: 'Зведені відомості' }
          },
          {
            path: 'personal-file-statement',
            loadChildren: '../personal-file-grades-statement/personal-file-grades-statement.module#PersonalFileGradesStatementModule',
            data: { title: 'Виписка в особову справу' }
          },
          {
            path: 'additional-documents',
            loadChildren: '../additional-documents/additional-documents.module#AdditionalDocumentsModule',
            data: { title: 'Додаткові документи' }
          }
        ]
      },
      {
        path: 'students',
        loadChildren: '../students/students.module#StudentsModule',
        data: { title: 'Студенти' }
      },
      {
        path: 'grades',
        loadChildren: '../grade/grade.module#GradeModule',
        data: { title: 'Оцінки' }
      },
      {
        path: 'courses-for-groups',
        loadChildren: '../courses-for-groups/courses-for-groups.module#CoursesForGroupsModule',
        data: { title: 'Предмети для груп' }
      },
      {
        path: 'course',
        loadChildren: '../course/course.module#CourseModule',
        data: { title: 'Предмети' }
      },
      {
        path: 'specialities',
        loadChildren: '../speciality/speciality.module#SpecialityModule',
        data: { title: 'Спеціальності' }
      },
      {
        path: 'groups',
        loadChildren: '../group/group.module#GroupModule',
        data: { title: 'Групи' }
      },
      {
        path: 'teachers',
        loadChildren: '../teachers/teachers.module#TeachersModule',
        data: { title: 'Викладачі' }
      },
      {
        path: 'departments',
        loadChildren: '../department/department.module#DepartmentModule',
        data: {title: 'Кафедри'}
      },
      {
        path: 'specializations',
        loadChildren: '../specialization/specialization.module#SpecializationModule',
        data: { title: 'Спеціалізації (освітні програми)' }
      },
      {
        path: 'finish-study-year',
        loadChildren: '../finish-study-year/finish-study-year.module#FinishStudyYearModule',
        data: { title: 'Закінчити навчальний рік' }
      },
      {
        path: 'reports',
        loadChildren: '../reports/reports.module#ReportsModule',
      },
      {
        path: 'orders',
        loadChildren: '../orders/orders.module#OrdersModule'
      }
    ]
  },
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

