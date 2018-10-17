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
  synchronizedStudentDegreesGreen: StudentDegreeFullEdeboData[];
  noSuchStudentOrSuchStudentDegreeInDbOrange: StudentDegreeFullEdeboData[];
  studentsSelected: boolean;

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
    let fullDate = new Date(miliseconds);
    let month , date;
    fullDate.getMonth() < 10 ? month = '0' + fullDate.getMonth() : month = fullDate.getMonth();
    fullDate.getDate() < 10 ? date = '0' + fullDate.getDate() : month = fullDate.getDate();
    let stringDate = date + '.' + month + '.' + fullDate.getFullYear();
    return stringDate;
  }

  onSelectAllStudents(checked: boolean): void {
    for (let student of this.noSuchStudentOrSuchStudentDegreeInDbOrange) {
      student.selected = checked;
    }
}

}

