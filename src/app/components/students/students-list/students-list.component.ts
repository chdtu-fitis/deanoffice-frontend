import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: [ './students-list.component.scss' ]
})
export class StudentsListComponent {
  @Input() students;
  @Output() onRemove = new EventEmitter();

  constructor() {
  }

  remove(id): void {
    this.onRemove.emit(id);
  }
}
