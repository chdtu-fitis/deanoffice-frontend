import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {CourseForGroup} from '../../../models/CourseForGroup';
import {Teacher} from "../../../models/Teacher";
import {StudentGroup} from "../../../models/StudentGroup";

@Component({
  selector: 'copy-courses-dialog',
  templateUrl: './copy-courses-dialog.component.html',
  styleUrls: ['./copy-courses-dialog.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ],
})
export class CopyCoursesDialogComponent implements OnInit {

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() groups: StudentGroup[];
  selectedGroup: StudentGroup;
  searchText = '';

  constructor() { }

  ngOnInit() {
  }

  selectGroup(group: StudentGroup){
    this.close();
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
