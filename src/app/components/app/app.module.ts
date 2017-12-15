import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AgGridModule} from 'ag-grid-angular/main';
import {GridComponent} from '../grid/grid.component';
import {FormsModule} from '@angular/forms';
import {AppRouteModule} from '../../routes/routes';

@NgModule(<NgModule>{
    declarations: [
        AppComponent,
        GridComponent,
    ],
    imports: [
        BrowserModule,
        AgGridModule.withComponents([GridComponent]),
        AppRouteModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {
}
