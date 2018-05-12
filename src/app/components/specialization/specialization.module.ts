import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecializationComponent } from './specialization.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SpecializationsTableComponent } from './specializations-table/specializations-table.component';
import { AddSpecializationComponent } from './add-specialization/add-specialization.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { DeleteSpecializationComponent } from './delete-specialization/delete-specialization.component';
import { SpecializationFormComponent } from './specialization-form/specialization-form.component';
import { SpecializationModalComponent } from './specialization-modal/specialization-modal.component';
import { UpdateSpecializationComponent } from './update-specialization/update-specialization.component';
import { SearchSpecializationsPipe } from './pipes/search-specializations.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TabsModule.forRoot()
  ],
  declarations: [
    SpecializationComponent,
    SpecializationsTableComponent,
    AddSpecializationComponent,
    DeleteSpecializationComponent,
    SpecializationFormComponent,
    SpecializationModalComponent,
    UpdateSpecializationComponent,
    SearchSpecializationsPipe
  ]
})
export class SpecializationModule { }
