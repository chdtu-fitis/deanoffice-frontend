import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MatListModule, MatSidenavModule, MatSlideToggleModule} from '@angular/material';

import {SharedModule} from '../shared/shared.module';
import {AuthenticationModule} from '../login/authentication.module';

import {GradeComponent} from './grade.component';
import {GradesPanelComponent} from './grades-panel/grades-panel.component';
import {GradesTableComponent} from './grades-table/grades-table.component';
import {StatementComponent} from './grade-statement/statement.component';
import {GradeStatementTableComponent} from './grade-statement/grade-statement-table/grade-statement-table.component';
import {PipeModule} from '../../pipes/pipe.module';
import {GradeRunnerComponent} from './grade-runner/grade-runner.component';

export const gradeRoutes: Routes = [
    {path: '', component: GradeComponent}
];

@NgModule({
    declarations: [
        GradeComponent,
        GradesPanelComponent,
        GradesTableComponent,
        GradeRunnerComponent,
        StatementComponent,
        GradeStatementTableComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(gradeRoutes),
        MatListModule,
        MatSidenavModule,
        MatSlideToggleModule,
        PipeModule
    ],
    providers: [AuthenticationModule.tokenInterceptor()]
})
export class GradeModule {
}
