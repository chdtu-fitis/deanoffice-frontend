import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DiplomaSupplementComponent} from "./diploma-supplement/diploma-supplement.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {path: 'diplsuppl', component: DiplomaSupplementComponent},
  {path: '', component: DiplomaSupplementComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
