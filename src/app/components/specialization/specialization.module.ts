import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecializationComponent } from './specialization.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SpecializationsTableComponent } from './specializations-table/specializations-table.component';
import { AddSpecializationComponent } from './add-specialization/add-specialization.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { DeleteSpecializationComponent } from './delete-specialization/delete-specialization.component';
import { SpecializationFormComponent } from './specialization-form/specialization-form.component';
import { UpdateSpecializationComponent } from './update-specialization/update-specialization.component';
import { SearchSpecializationsPipe } from './pipes/search-specializations.pipe';
import {RouterModule, Routes} from '@angular/router';
import { SpecializationCompetenciesComponent } from './specialization-form/specialization-competencies/specialization-competencies.component';
import {AcquiredCompetenciesService} from './specialization-form/services/acquired-competencies.service';
import {AuthenticationModule} from '../login/authentication.module';
import { SpecializationQualificationComponent } from './specialization-form/specialization-qualification/specialization-qualification.component';
import {QualificationService} from './specialization-form/services/qualification.service';
import { ChangeQualificationComponent } from './specialization-form/specialization-qualification/change-qualification/change-qualification.component';
import {AlertModule} from 'ngx-bootstrap';
import {PipeModule} from "../../pipes/pipe.module";

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
    RouterModule.forChild(specializationRoutes),
    PipeModule.forRoot()
  ],
  declarations: [
    SpecializationComponent,
    SpecializationsTableComponent,
    AddSpecializationComponent,
    DeleteSpecializationComponent,
    SpecializationFormComponent,
    UpdateSpecializationComponent,
    SearchSpecializationsPipe,
    SpecializationCompetenciesComponent,
    SpecializationQualificationComponent,
    ChangeQualificationComponent
  ],
  providers: [
    AcquiredCompetenciesService,
    QualificationService,
    AuthenticationModule.tokenInterceptor()
  ]
})
export class SpecializationModule { }
