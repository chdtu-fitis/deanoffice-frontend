import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DiplomaSupplementComponent} from '../components/diploma-supplement/diploma-supplement.component';
import {ExamReportComponent} from '../components/exam-report/exam-report.component';
import {StudentsComponent} from '../components/students/students.component';
import {CoursesForGroupsModule} from '../components/courses-for-groups/courses-for-groups.module';
import {CoursesForGroupsComponent} from '../components/courses-for-groups/courses-for-groups.component';
import {ExpelledStudentsComponent} from '../components/students/expelled-students/expelled-students.component';

const routes: Routes = [
  {path: 'diploma-supplement', component: DiplomaSupplementComponent},
  {path: 'examreport', component: ExamReportComponent},
  {path: 'students', component: StudentsComponent},
  {path: 'expelled', component: ExpelledStudentsComponent},
  {path: 'courses-for-groups', component: CoursesForGroupsComponent}
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
