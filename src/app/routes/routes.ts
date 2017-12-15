import {RouterModule, Routes} from '@angular/router';
import {GridComponent} from '../components/grid/grid.component';
import {NgModule} from '@angular/core';

const webRoutes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: GridComponent, pathMatch: 'full'},
];

@NgModule(<NgModule>{
    exports: [RouterModule],
    imports: [RouterModule.forRoot(webRoutes)]
})
export class AppRouteModule{
}