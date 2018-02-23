import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DiplomaSupplementComponent} from '../components/diploma-supplement/diploma-supplement.component';
import {StudentsComponent} from '../components/students/students.component';
import {AppComponent} from '../components/app/app.component';
import {ExamReportComponent} from "../components/exam-report/exam-report.component";

const routes: Routes = [
    {path: 'diplsuppl', component: DiplomaSupplementComponent},
    {path: 'examreport', component: ExamReportComponent},
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
