import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GroupComponent } from './group/group.component';
import { SpecialityComponent } from './speciality/speciality.component';
import {CoursesForGroupsModule} from "./courses-for-groups/courses-for-groups.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    SpecialityComponent
  ],
  imports: [
    BrowserModule,
    CoursesForGroupsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
