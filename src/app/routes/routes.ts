import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DiplomaSupplementComponent} from '../components/diploma-supplement/diploma-supplement.component';
import {AppComponent} from '../components/app/app.component';
import {ExamReportComponent} from "../components/exam-report/exam-report.component";
import {CoursesForGroupsComponent} from "../components/courses-for-groups/courses-for-groups.component";
import {CoursesForGroupsModule} from "../components/courses-for-groups/courses-for-groups.module";

const routes: Routes = [
    {path: 'diplsuppl', component: DiplomaSupplementComponent},
    {path: 'examreport', component: ExamReportComponent},
    {path: '', component: DiplomaSupplementComponent, pathMatch: 'full'},
    {path: 'courses-for-groups', component: CoursesForGroupsComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
      CoursesForGroupsModule
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
