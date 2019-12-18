import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScannedDocsRoutingModule } from './scanned-docs-routing.module';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ScannedDocsListPageComponent } from './pages/scanned-docs-list-page/scanned-docs-list-page.component';
import { ScannedDocsEditPageComponent } from './pages/scanned-docs-edit-page/scanned-docs-edit-page.component';
import { ScannedDocsService } from './services/scanned-docs.service';
import { DocumentCacheService } from './services/document-cache.service';
import { EditDocumentGuard } from './guards/edit-document.guard';
import { ScannedDocumentFormComponent } from './components/scanned-document-form/scanned-document-form.component';
import { ScannedDocumentsListComponent } from './components/scanned-documents-list/scanned-documents-list.component';

@NgModule({
  imports: [
    CommonModule,
    ScannedDocsRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MainLayoutComponent,
    ScannedDocsListPageComponent,
    ScannedDocsEditPageComponent,
    ScannedDocumentFormComponent,
    ScannedDocumentsListComponent,
  ],
  providers: [
    ScannedDocsService,
    DocumentCacheService,
    EditDocumentGuard,
  ],
  exports: [
    ScannedDocumentFormComponent,
    ScannedDocumentsListComponent,
  ]
})
export class ScannedDocsModule { }
