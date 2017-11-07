import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GroupComponent } from './group/group.component';
import { SpecialityComponent } from './speciality/speciality.component';
import {CoursesForGroupsModule} from "./courses-for-groups/courses-for-groups.module";

@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    SpecialityComponent
  ],
  imports: [
    BrowserModule,
    CoursesForGroupsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
