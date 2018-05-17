import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {GradeComponent} from './grade.component';
import {GradesPanelComponent} from './grades-panel/grades-panel.component';
import {GradesTableComponent} from './grades-table/grades-table.component';

import {MatListModule, MatSidenavModule} from '@angular/material';

import {StatementComponent} from './grade-statement/statement.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AppModule} from '../app/app.module';

export const gradeRoutes: Routes = [
  {path: '', component: GradeComponent}
];

@NgModule({
  declarations: [
    GradeComponent,
    GradesPanelComponent,
    GradesTableComponent,
    StatementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(gradeRoutes),
    MatListModule,
    MatSidenavModule
  ],
  providers: [AppModule.tokenInterceptor()],
  exports: [RouterModule]
})
export class GradeModule {}
