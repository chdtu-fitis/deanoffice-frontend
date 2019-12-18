import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScannedDocsService } from './services/scanned-docs.service';
import { ScannedDocumentFormComponent } from './components/scanned-document-form/scanned-document-form.component';
import { ScannedDocumentsListComponent } from './components/scanned-documents-list/scanned-documents-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ScannedDocumentFormComponent,
    ScannedDocumentsListComponent
  ],
  providers: [
    ScannedDocsService
  ],
  exports: [
    ScannedDocumentFormComponent,
    ScannedDocumentsListComponent
  ]
})
export class ScannedDocsModule { }
