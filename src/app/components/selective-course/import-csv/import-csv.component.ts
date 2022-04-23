import {Component, NgModule, ViewChild} from '@angular/core';
import {BsModalRef, ModalDirective} from 'ngx-bootstrap/modal';

import {SelectiveCourseService} from '../../../services/selective-course.service';
import {ImportSelectiveCourseCorrect} from './model/ImportSelectiveCourseCorrect';
import {ImportSelectiveCourseIncorrect} from './model/ImportSelectiveCourseIncorrect';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utils} from '../../shared/utils';
import {ImportSelectiveCourseForSave} from "./model/ImportSelectiveCourseForSave";
import {UpdateSelectiveCourses} from "./model/UpdateSelectiveCourses";

@Component({
  selector: 'import-csv',
  templateUrl: './import-csv.component.html',
  styleUrls: ['./import-csv.component.scss']
})
export class ImportCsvComponent {

  @ViewChild('modal', { static: false }) modal: ModalDirective;
  fileName = 'Виберіть файл';
  modalName = 'Вибіркові предмети';
  selectedFile: File;
  fileNameValid: string;
  uploadInProgress = false;
  resultView = false;
  fileField = true;
  downloadButton = true;
  saveButton = false;
  tableView = false;
  selectiveCoursesCorrect: ImportSelectiveCourseCorrect[];
  selectiveCoursesIncorrect: ImportSelectiveCourseIncorrect[];
  notUpdatedData: string[];
  updatedData: number;
  isNotUpdatedData: boolean;
  form: FormGroup;
  allRowsIsSelected = true;
  degreeId: number;
  studyYear: number;
  degrees: any[];

  constructor(public bsModalRef: BsModalRef, private selectiveCourseService: SelectiveCourseService, private fb: FormBuilder) {}

  onShow() {
    this.fileName = 'Виберіть файл';
    this.fileField = true;
    this.downloadButton = true;
  }

  hideModal() {
    this.modal.hide();

    setTimeout(() => {
      this.tableView = false;
      this.saveButton = false;
      this.resultView = false;
    }, 500);
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

    this.selectiveCourseService.uploadImportedSelectiveCoursesData(formData).subscribe(
      res => {
        this.selectiveCoursesCorrect = res.selectiveCoursesCorrect;
        this.selectiveCoursesCorrect.map(course => course.selected = true);
        this.selectiveCoursesIncorrect = res.selectiveCoursesIncorrect;
        this.uploadInProgress = false;
        this.downloadButton = false;
        this.tableView = true;
      }
    );
  }

  saveImportCourses() {
    const selectiveCoursesForSave = this.getSelectedCourses();
    this.selectiveCourseService.addImportedSelectiveCourses(selectiveCoursesForSave).subscribe(
      response => {
        this.updatedData = response.updatedData;
        this.notUpdatedData = response.notUpdatedData;
        this.modalName = 'Дані змінено';
        this.tableView = !this.tableView;
        this.resultView = true;
        this.isNotUpdatedData = this.notUpdatedData.length !== 0;
      }
    );
    this.saveButton = true;
  }

  // private getStudentsWithCorrectData(): DiplomaNumberForSaveDTO[] {
  private getSelectedCourses(): ImportSelectiveCourseForSave[] {
     const selectedCourses = this.selectiveCoursesCorrect.filter(course => course.selected);
     return selectedCourses.map(course => new ImportSelectiveCourseForSave(course, this.degreeId, this.studyYear));
  }

  changeAllIsSelected(isSelected: boolean): void {
    this.selectiveCoursesCorrect.forEach(course => course.selected = isSelected);
    this.allRowsIsSelected = isSelected;
  }

  coursesSelect() {
     this.allRowsIsSelected = this.selectiveCoursesCorrect.every(course => course.selected);
  }


}
