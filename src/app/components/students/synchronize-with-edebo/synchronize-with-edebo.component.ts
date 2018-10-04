import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {IAppModal} from '../../shared/modal.interface';
import {EdeboService} from '../../../services/edebo.service';

@Component({
  selector: 'synchronize-with-edebo',
  templateUrl: './synchronize-with-edebo.component.html',
  styleUrls: ['./synchronize-with-edebo.component.scss']
})
export class SynchronizeWithEdeboComponent implements IAppModal {
  @ViewChild('modal') modal: ModalDirective;
  selectedFile: File = null;
  fileName = 'Вибрати файл';

  constructor(private fileUploader: EdeboService) {
  }

  onFileSelected(event) {
    this.selectedFile = <File> event.target.files[0];
    this.fileName = this.selectedFile.name;
  }

  onFileUpload(): void {
    let formData = new FormData();
    formData.append('uploadFile', this.selectedFile, this.selectedFile.name);
    this.fileUploader.uploadFile(formData).subscribe(res => {});
  }
}
