import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-photo-upload',
    templateUrl: './photo-upload.component.html',
    styleUrls: ['./photo-upload.component.scss'],
})
export class PhotoUploadComponent {
  preview: WindowBase64;
  @Input() set photo(data) {
    if (data) {
      this.generatePreviewImage(data);
    } else {
      this.preview = null;
    }
  }
  @Output() onLoad = new EventEmitter();

  onSelectFile(event) {
    const files = event.target.files;
    if (files && files[0]) {
      this.onLoad.emit(files[0]);
      this.generatePreviewImage(files[0]);
    }
  }

  private generatePreviewImage(data) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.preview = e.target['result'];
    };
    reader.readAsDataURL(data);
  }
}
