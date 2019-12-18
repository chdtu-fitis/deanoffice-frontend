import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentCacheService } from '../../services/document-cache.service';
import { ScannedDocument } from '../../models/scanned-document';
import { ScannedDocsRoutingEnum } from '../../models/scanned-docs-routing.enum';
import { LangEnum } from '../../models/lang.enum';

@Component({
  templateUrl: './scanned-docs-edit-page.component.html',
  styleUrls: ['./scanned-docs-edit-page.component.scss']
})
export class ScannedDocsEditPageComponent implements OnInit {
  scannedDocument: ScannedDocument;
  readonly Lang = LangEnum;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cache: DocumentCacheService
  ) { }

  ngOnInit() {
    this.scannedDocument = this.cache.document;
  }

  backToList(): void {
    this.cache.document = null;
    this.router.navigate([`../${ScannedDocsRoutingEnum.LIST}`], { relativeTo: this.route });
  }
}
