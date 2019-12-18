import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentCacheService } from '../../services/document-cache.service';
import { ScannedDocument } from '../../models/scanned-document';
import { ScannedDocsRoutingEnum } from '../../models/scanned-docs-routing.enum';

@Component({
  templateUrl: './scanned-docs-list-page.component.html',
  styleUrls: ['./scanned-docs-list-page.component.scss']
})
export class ScannedDocsListPageComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cache: DocumentCacheService
  ) { }

  editDocument(d: ScannedDocument): void {
    this.cache.document = d;
    this.router.navigate([`../${ScannedDocsRoutingEnum.EDIT}`], { relativeTo: this.route });
  }
}
