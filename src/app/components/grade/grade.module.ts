import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {GradeComponent} from './grade.component';
import {GradesPanelComponent} from './grades-panel/grades-panel.component';
import {GradesTableComponent} from './grades-table/grades-table.component';

import {
    MatListModule,
    MatSidenavModule,
} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StatementComponent} from './grade-statement/statement.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    exports: [
        MatListModule,
        MatSidenavModule
    ]
})
export class GradeMaterialModule {
}

@NgModule({
    declarations: [
        GradeComponent,
        GradesPanelComponent,
        GradesTableComponent,
        StatementComponent
    ],
    imports: [
        BrowserAnimationsModule,
        GradeMaterialModule,
        FormsModule,
        SharedModule
    ]
})
export class GradeModule {
}
