import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';

import {EdeboDiplomaNumberService} from '../../../services/edebo-diploma-number.service';
import {DiplomaAndSynchronizedStudentDTO} from '../../../models/edebo-diploma-number/DiplomaAndSynchronizedStudentDTO';
import {MissingEdeboDiplomaRedDTO} from '../../../models/edebo-diploma-number/MissingEdeboDiplomaRedDTO';
import {DiplomaNumberForSaveDTO} from '../../../models/edebo-diploma-number/DiplomaNumberForSaveDTO';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'edebo-diploma-number',
  templateUrl: './edebo-diploma-number.component.html',
  styleUrls: ['./edebo-diploma-number.component.scss']
})
export class EdeboDiplomaNumberComponent {

  @ViewChild('modal') modal: ModalDirective;
  fileName = 'Виберіть файл';
  modalName = 'Номера дипломів';
  selectedFile: File;
  fileNameValid: string;
  uploadInProgress = false;
  resultView = false;
  fileField = true;
  downloadButton = true;
  saveButton = false;
  tableView = false;
  diplomaSynchronizedData: DiplomaAndSynchronizedStudentDTO[];
  missingRedData: MissingEdeboDiplomaRedDTO[];
  notUpdatedDiplomaData: string[];
  updatedDiplomaData: number;
  isNotUpdatedDiplomaData: boolean;
  form: FormGroup;

  constructor(private edeboDiplomaNumberService: EdeboDiplomaNumberService, private fb: FormBuilder) {

  }

  setFileName(event) {
    this.fileName = event.target.files[0].name;
    this.selectedFile = event.target.files[0];
  }

  onFileUpload() {
    this.fileField = false;
    this.uploadInProgress = true;
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.fileName);

    this.edeboDiplomaNumberService.uploadDiplomaNumberDoc(formData).subscribe(
      res => {
        this.diplomaSynchronizedData = res.diplomaAndStudentSynchronizedDataDTOs;
        this.missingRedData = res.missingDataRedDTOs;
        this.uploadInProgress = false;
        this.downloadButton = false;
        this.tableView = true;
      }
    );
  }

  hideModal() {
    this.modal.hide();

    setTimeout(() => {
      this.tableView = false;
      this.saveButton = false;
      this.resultView = false;
    }, 500);
  }

  saveDiplomaNumbers() {
    const diplomaNumberDataForSaveDTOS = this.getStudentsWithCorrectData();
    this.edeboDiplomaNumberService.updateDiplomaData(diplomaNumberDataForSaveDTOS, this.form.value).subscribe(
      response => {
        this.updatedDiplomaData = response.updatedDiplomaData;
        this.notUpdatedDiplomaData = response.notUpdatedDiplomaData;
        this.modalName = 'Дані змінено';
        this.tableView = !this.tableView;
        this.resultView = true;
        this.isNotUpdatedDiplomaData = this.notUpdatedDiplomaData.length !== 0;
      }
    );
    this.saveButton = true;
  }

  private getStudentsWithCorrectData(): DiplomaNumberForSaveDTO[] {
    return this.diplomaSynchronizedData
      .map(student => {
        return {
          id: student.id,
          surname: student.surname,
          name: student.name,
          patronimic: student.patronimic,
          diplomaSeriesAndNumber: student.diplomaSeriesAndNumber,
          honor: student.honor
        }
      });
  }

  onShow() {
    this.fileName = 'Виберіть файл';
    this.fileField = true;
    this.downloadButton = true;
    this.form = this.fb.group({
      diplomaDate: ['', Validators.required],
      supplementDate: ['', Validators.required],
    });
    this.modal.show();
  }
}
