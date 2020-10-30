import {AdministrationGuard, DashboardGuard, LoginGuard} from '../../services/auth/auth.guard';
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
    loadChildren: () => import('../login/authentication.module').then(m => m.AuthenticationModule),
    canActivate: [LoginGuard],
    data: { title: 'Вхід' }
  },
  {
    path: 'dashboard', canActivate: [DashboardGuard], data: { title: 'Головна' }, children: [
      {
        path: 'documents', children: [
          {
            path: 'diploma-supplement',
            loadChildren: () => import('../diploma-supplement/diploma-supplement.module').then(m => m.DiplomaSupplementModule),
            data: { title: 'Додатки до диплому' }
          },
          {
            path: 'exam-report',
            loadChildren: () => import('../exam-report/exam-report.module').then(m => m.ExamReportModule),
            data: { title: 'Відомості' }
          },
          {
            path: 'consolidated-exam-report',
            loadChildren: () => import('../consolidated-exam-report/consolidated-exam-report.module').then(m => m.ConsolidatedExamReportModule),
            data: { title: 'Зведені відомості' }
          },
          {
            path: 'personal-file-statement',
            loadChildren: () => import('../personal-file-grades-statement/personal-file-grades-statement.module').then(m => m.PersonalFileGradesStatementModule),
            data: { title: 'Виписка в особову справу' }
          },
          {
            path: 'additional-documents',
            loadChildren: () => import('../additional-documents/additional-documents.module').then(m => m.AdditionalDocumentsModule),
            data: { title: 'Додаткові документи' }
          }
        ]
      },
      {
        path: 'students',
        loadChildren: () => import('../students/students.module').then(m => m.StudentsModule),
        data: { title: 'Студенти' }
      },
      {
        path: 'grades',
        loadChildren: () => import('../grade/grade.module').then(m => m.GradeModule),
        data: { title: 'Оцінки' }
      },
      {
        path: 'courses-for-groups',
        loadChildren: () => import('../courses-for-groups/courses-for-groups.module').then(m => m.CoursesForGroupsModule),
        data: { title: 'Предмети для груп' }
      },
      {
        path: 'selective-courses',
        loadChildren: () => import('../selective-course/selective-course.module').then(m => m.SelectiveCourseModule),
        data: { title: 'Вибіркові предмети' }
      },
      {
        path: 'course',
        loadChildren: () => import('../course/course.module').then(m => m.CourseModule),
        data: { title: 'Предмети' }
      },
      {
        path: 'specialities',
        loadChildren: () => import('../speciality/speciality.module').then(m => m.SpecialityModule),
        data: { title: 'Спеціальності' }
      },
      {
        path: 'groups',
        loadChildren: () => import('../group/group.module').then(m => m.GroupModule),
        data: { title: 'Групи' }
      },
      {
        path: 'teachers',
        loadChildren: () => import('../teachers/teachers.module').then(m => m.TeachersModule),
        data: { title: 'Викладачі' }
      },
      {
        path: 'departments',
        loadChildren: () => import('../department/department.module').then(m => m.DepartmentModule),
        data: {title: 'Кафедри'}
      },
      {
        path: 'specializations',
        loadChildren: () => import('../specialization/specialization.module').then(m => m.SpecializationModule),
        data: { title: 'Спеціалізації (освітні програми)' }
      },
      {
        path: 'finish-study-year',
        loadChildren: () => import('../finish-study-year/finish-study-year.module').then(m => m.FinishStudyYearModule),
        data: { title: 'Закінчити навчальний рік' }
      },
      {
        path: 'reports',
        loadChildren: () => import('../reports/reports.module').then(m => m.ReportsModule),
      },
      {
        path: 'administration-tool',
        loadChildren: () => import('../administration-tool/administration-tool.module').then(m => m.AdministrationToolModule),
        canActivate: [
          AdministrationGuard,
        ]
      }
    ]
  },
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

