import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AlertModule} from 'ngx-bootstrap/alert';
import {TabsModule} from 'ngx-bootstrap/tabs';

import { SpecializationComponent } from './specialization.component';
import {SharedModule} from '../shared/shared.module';
import { AddSpecializationComponent } from './add-specialization/add-specialization.component';
import { DeleteSpecializationComponent } from './delete-specialization/delete-specialization.component';
import { SpecializationFormComponent } from './specialization-form/specialization-form.component';
import { UpdateSpecializationComponent } from './update-specialization/update-specialization.component';
import { SearchSpecializationsPipe } from './pipes/search-specializations.pipe';
import { SpecializationCompetenciesComponent } from './specialization-form/specialization-competencies/specialization-competencies.component';
import {AcquiredCompetenciesService} from './specialization-form/services/acquired-competencies.service';
import {AuthenticationModule} from '../login/authentication.module';
import { SpecializationQualificationComponent } from './specialization-form/specialization-qualification/specialization-qualification.component';
import {QualificationService} from './specialization-form/services/qualification.service';
import { ChangeQualificationComponent } from './specialization-form/specialization-qualification/change-qualification/change-qualification.component';
import {PipeModule} from '../../pipes/pipe.module';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { RecoverySpecializationComponent } from './recovery-specialization/recovery-specialization.component';
import {TypeaheadModule} from "ngx-bootstrap/typeahead";

export const specializationRoutes: Routes = [
  {path: '', component: SpecializationComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TabsModule.forRoot(),
    AlertModule.forRoot(),
    TypeaheadModule.forRoot(),
    RouterModule.forChild(specializationRoutes),
    PipeModule.forRoot(),
    MatSlideToggleModule,
  ],
  declarations: [
    SpecializationComponent,
    AddSpecializationComponent,
    DeleteSpecializationComponent,
    SpecializationFormComponent,
    UpdateSpecializationComponent,
    SearchSpecializationsPipe,
    SpecializationCompetenciesComponent,
    SpecializationQualificationComponent,
    ChangeQualificationComponent,
    RecoverySpecializationComponent
  ],
  providers: [
    AcquiredCompetenciesService,
    QualificationService,
    AuthenticationModule.tokenInterceptor()
  ]
})
export class SpecializationModule { }
