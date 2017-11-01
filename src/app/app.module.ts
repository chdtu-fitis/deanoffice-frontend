import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SubjectforgroupComponent } from './subjectforgroup/subjectforgroup.component';
import { GroupComponent } from './group/group.component';
import { SpecialityComponent } from './speciality/speciality.component';

@NgModule({
  declarations: [
    AppComponent,
    SubjectforgroupComponent,
    GroupComponent,
    SpecialityComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
