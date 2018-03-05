import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DiplomaSupplementComponent} from '../components/diploma-supplement/diploma-supplement.component';
import {ExamReportComponent} from '../components/exam-report/exam-report.component';
import {GridComponent} from '../components/grid/grid.component';
import {StudentsComponent} from '../components/students/students.component';

const routes: Routes = [
  {path: 'diplsuppl', component: DiplomaSupplementComponent, pathMatch: 'full'},
  {path: 'examreport', component: ExamReportComponent, pathMatch: 'full'},
  {path: 'test', component: GridComponent, pathMatch: 'full'},
  {path: 'students', component: StudentsComponent},
  {path: '', component: DiplomaSupplementComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
