import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScannedDocsRoutingEnum } from './models/scanned-docs-routing.enum';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ScannedDocsListPageComponent } from './pages/scanned-docs-list-page/scanned-docs-list-page.component';
import { ScannedDocsEditPageComponent } from './pages/scanned-docs-edit-page/scanned-docs-edit-page.component';
import { EditDocumentGuard } from './guards/edit-document.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: ScannedDocsRoutingEnum.LIST,
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: ScannedDocsRoutingEnum.LIST,
        component: ScannedDocsListPageComponent
      },
      {
        path: ScannedDocsRoutingEnum.EDIT,
        canActivate: [EditDocumentGuard],
        component: ScannedDocsEditPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScannedDocsRoutingModule { }
