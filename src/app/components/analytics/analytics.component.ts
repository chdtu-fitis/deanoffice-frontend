import { Component, OnInit } from '@angular/core';
import {GoogleApiService} from 'ng-gapi';
import HttpBatch = gapi.client.HttpBatch;

@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  constructor(gapiService: GoogleApiService) {
    gapiService.onLoad().subscribe(()=> {
      const myBatch: HttpBatch = new HttpBatch();

    });
  }

  ngOnInit() {
  }

}
