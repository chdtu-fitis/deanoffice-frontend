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

const routes: Routes = [
  {path: 'diploma-supplement', component: DiplomaSupplementComponent},
  {path: 'examreport', component: ExamReportComponent},
  {path: 'students', component: StudentsComponent},
  {path: 'grades', component: GradeComponent},
  {path: 'expelled', component: ExpelledStudentsComponent},
  {path: 'in-vacation', component: StudentsInVacationComponent},
  {path: 'courses-for-groups', component: CoursesForGroupsComponent},
  {path: 'specialities', component: SpecialityComponent}
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
