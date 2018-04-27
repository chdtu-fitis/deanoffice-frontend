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
        GradesTableComponent
    ],
    imports: [
        BrowserAnimationsModule,
        GradeMaterialModule,
        FormsModule
    ]
})
export class GradeModule {
}
