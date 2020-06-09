import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'student-oreder-preview',
  templateUrl: './student-oreder-preview.component.html',
  styleUrls: ['./student-oreder-preview.component.scss']
})
export class StudentOrederPreviewComponent implements OnInit {

  @Input() studentPreviewData: any;
  @Input() studentExpelData: any;

  constructor() { }

  ngOnInit() {
  }

}
