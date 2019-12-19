import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ScannedDocsService } from '../../services/scanned-docs.service';
import { ScannedDocument } from '../../models/scanned-document';
import { LangEnum } from '../../models/lang.enum';

@Component({
  selector: 'scanned-documents-list',
  templateUrl: './scanned-documents-list.component.html',
  styleUrls: ['./scanned-documents-list.component.scss']
})
export class ScannedDocumentsListComponent implements OnInit {
  @Output() editDocument = new EventEmitter<ScannedDocument>();
  scannedDocumentList: ScannedDocument[] = [];
  readonly LangEnum = LangEnum;

  constructor(private sd: ScannedDocsService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  onEdit(id: number): void {
    this.editDocument.emit(this.scannedDocumentList[id]);
  }

  private fetchData(): void {
    this.sd
      .fetch()
      .subscribe((docs: ScannedDocument[]) => {
        this.scannedDocumentList = docs;
      });
  }
}
