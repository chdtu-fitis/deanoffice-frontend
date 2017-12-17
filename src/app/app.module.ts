import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GroupComponent } from './group/group.component';
import { SpecialityComponent } from './speciality/speciality.component';
import {CoursesForGroupsModule} from "./courses-for-groups/courses-for-groups.module";
import {HttpClientModule} from "@angular/common/http";
import { DiplomaSupplementComponent } from './diploma-supplement/diploma-supplement.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from "@angular/forms";
import {DegreeService} from "./model/service/degree.service";
import {GroupService} from "./model/service/group.service";
import {StudentService} from "./model/service/student.service";

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
export class AppModule { }
