import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {IAppModal} from '../../shared/modal.interface';
import {EdeboService} from '../../../services/edebo.service';
import {StudentDegreeFullEdeboData} from '../../../models/synchronization-edebo-models/StudentDegreeFullEdeboData';

@Component({
  selector: 'synchronize-with-edebo',
  templateUrl: './synchronize-with-edebo.component.html',
  styleUrls: ['./synchronize-with-edebo.component.scss'],
})
export class SynchronizeWithEdeboComponent implements IAppModal {
  @ViewChild('modal') modal: ModalDirective;
  selectedFile: File = null;
  fileName = 'Вибрати файл';
  importView = true;
  modalName = 'Імпортувати файл';
  modalSize = '';
  synchronizedStudentDegreesGreen: StudentDegreeFullEdeboData;
  noSuchStudentOrSuchStudentDegreeInDbOrange: StudentDegreeFullEdeboData;

  constructor(private fileUploader: EdeboService) {
  }

  onFileSelected(event) {
    this.selectedFile = <File> event.target.files[0];
    this.fileName = this.selectedFile.name;
  }

  onFileUpload(): void {
    let formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.fileUploader.uploadFile(formData).subscribe(
        res => {
          this.synchronizedStudentDegreesGreen = res.synchronizedStudentDegreesGreen;
          this.noSuchStudentOrSuchStudentDegreeInDbOrange = res.noSuchStudentOrSuchStudentDegreeInDbOrange;
          this.changeModal();
        }
    );
  }

  changeToImportModal(): void {
    this.importView = true;
    this.modalName = 'Імпортувати файл';
    this.modalSize = '';
    this.modal.show();
  }

  changeModal(): void {
    this.modalName = 'Студенти';
    this.modalSize = 'modal-full';
    this.importView = !this.importView;
  }
  convertDate(miliseconds): String {
    let date = new Date(miliseconds);
    let stringDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
    return stringDate;
  }
}

