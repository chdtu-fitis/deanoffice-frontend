import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GroupComponent } from '../group/group.component';
import { SpecialityComponent } from '../speciality/speciality.component';
import { HttpClientModule } from '@angular/common/http';
import { DiplomaSupplementComponent } from '../diploma-supplement/diploma-supplement.component';
import { AppRoutingModule } from '../../routes/routes';
import { FormsModule } from '@angular/forms';
import { DegreeService } from '../../services/degree.service';
import { GroupService } from '../../services/group.service';
import { StudentService } from '../../services/student.service';

@NgModule({
    declarations: [
        AppComponent,
        GroupComponent,
        SpecialityComponent,
        DiplomaSupplementComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [DegreeService, GroupService, StudentService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
