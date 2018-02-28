import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DiplomaSupplementComponent} from '../components/diploma-supplement/diploma-supplement.component';
import {AppComponent} from '../components/app/app.component';
import {ExamReportComponent} from '../components/exam-report/exam-report.component';

const routes: Routes = [
    {path: 'diplsuppl', component: DiplomaSupplementComponent},
    {path: 'examreport', component: ExamReportComponent},
    {path: '', component: DiplomaSupplementComponent, pathMatch: 'full'} // TODO: вместо такого лучше использовать редирект
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
