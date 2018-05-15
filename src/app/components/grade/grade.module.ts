import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {GradeComponent} from './grade.component';
import {GradesPanelComponent} from './grades-panel/grades-panel.component';
import {GradesTableComponent} from './grades-table/grades-table.component';

import {MatListModule, MatSidenavModule} from '@angular/material';

import {StatementComponent} from './grade-statement/statement.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {gradeRoutes} from '../../routes/routes';
import {CommonModule} from '@angular/common';

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
    CommonModule,
    GradeMaterialModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(gradeRoutes)
  ],
  exports: [RouterModule]
})
export class GradeModule {}
