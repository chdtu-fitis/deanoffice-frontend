import { Component, EventEmitter, Input, Output } from '@angular/core';

import { maxFileSize } from '../constants';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: [ './photo-upload.component.scss' ]
})
export class PhotoUploadComponent {
  preview: WindowBase64;
  error: string;
  @Input() set photo(data) {
    if (data) {
      this.generatePreviewImage(data);
    } else {
      this.preview = null;
    }
  }
  @Output() onLoad = new EventEmitter();

  onSelectFile(event): void {
    this.error = '';
    const files: File[] = event.target.files;
    if (files && files[0]) {
      if (files[0].size > maxFileSize) {
        this.error = 'Файл занадто великий.';
        return;
      }
      this.onLoad.emit(files[0]);
      this.generatePreviewImage(files[0]);
    }
  }

  private generatePreviewImage(data): void {
    const reader = new FileReader();
    reader.onload = (e): void => {
      this.preview = e.target['result'];
    };
    reader.readAsDataURL(data);
  }
}
