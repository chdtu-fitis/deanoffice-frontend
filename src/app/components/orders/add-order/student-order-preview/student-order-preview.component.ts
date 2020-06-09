import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray} from '@angular/forms';

@Component({
  selector: 'student-oreder-preview',
  templateUrl: './student-order-preview.component.html',
  styleUrls: ['./student-order-preview.component.scss']
})
export class StudentOrderPreviewComponent implements OnInit {

  @Input() studentPreviewData: FormArray;
  @Input() studentExpelData: any;
  @Output() onPreviewSave: EventEmitter<void> = new EventEmitter<void>();

  isPreviewEditable = false;

  constructor() { }

  ngOnInit() {}

  onChange(value, index) {
    this.studentPreviewData.controls[index].patchValue({ value, editable: true });
  }

  onSave() {
    this.isPreviewEditable = true;
    this.onPreviewSave.emit();
  }
}
