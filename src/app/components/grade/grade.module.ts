import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MatListModule, MatSidenavModule} from '@angular/material';

import {SharedModule} from '../shared/shared.module';
import {AuthenticationModule} from '../login/authentication.module';

import {GradeComponent} from './grade.component';
import {GradesPanelComponent} from './grades-panel/grades-panel.component';
import {GradesTableComponent} from './grades-table/grades-table.component';
import {StatementComponent} from './grade-statement/statement.component';
import {GradeStatementTableComponent} from './grade-statement/grade-statement-table/grade-statement-table.component';
import {PipeModule} from '../../pipes/pipe.module';

export const gradeRoutes: Routes = [
    {path: '', component: GradeComponent}
];

@NgModule({
    declarations: [
        GradeComponent,
        GradesPanelComponent,
        GradesTableComponent,
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
        PipeModule
    ],
    providers: [AuthenticationModule.tokenInterceptor()]
})
export class GradeModule {
}
