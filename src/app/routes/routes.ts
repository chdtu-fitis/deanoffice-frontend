import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DiplomaSupplementComponent} from '../components/diploma-supplement/diploma-supplement.component';
import {AppComponent} from '../components/app/app.component';
import {GridComponent} from '../components/grid/grid.component';

const routes: Routes = [
    {path: 'diplsuppl', component: DiplomaSupplementComponent, pathMatch: 'full'},
    {path: 'test', component: GridComponent, pathMatch: 'full'},
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
export class AppRoutingModule {
}
