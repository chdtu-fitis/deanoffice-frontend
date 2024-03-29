import {Component, NgModule, ViewChild} from '@angular/core';
import {BsModalRef, ModalDirective} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {ImportSelectiveCourseCorrect} from './model/ImportSelectiveCourseCorrect';
import {ImportSelectiveCourseIncorrect} from './model/ImportSelectiveCourseIncorrect';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utils} from '../../shared/utils';
import {ImportSelectiveCourseForSave} from "./model/ImportSelectiveCourseForSave";
import {CreateSelectiveCoursesResult} from "./model/CreateSelectiveCoursesResult";


@Component({
  selector: 'import-csv',
  templateUrl: './import-csv.component.html',
  styleUrls: ['./import-csv.component.scss']
})
export class ImportCsvComponent {
  fileName = 'Виберіть файл';
  modalName = 'Вибіркові предмети';
  selectedFile: File;
  fileNameValid: string;
  isUploadInProgress = false;
  isResultViewVisible = false;
  isFileViewVisible = true;
  isUploadButtonVisible = true;
  isSaveButtonVisible = false;
  isTableViewVisible = false;
  correctSelectiveCourses: ImportSelectiveCourseCorrect[];
  incorrectSelectiveCourses: ImportSelectiveCourseIncorrect[];
  creationResult: CreateSelectiveCoursesResult;
  isNotUpdatedData: boolean;
  form: FormGroup;
  allRowsIsSelected = true;
  degreeId: number;
  studyYear: number;
  degrees: any[];

  constructor(public bsModalRef: BsModalRef, private selectiveCourseService: SelectiveCourseService, private fb: FormBuilder) {}

  onShow() {
    this.fileName = 'Виберіть файл';
    this.isFileViewVisible = true;
    this.isUploadButtonVisible = true;
  }

  setFileName(event) {
    this.fileName = event.target.files[0].name;
    this.selectedFile = event.target.files[0];
  }

  onFileUpload() {
    this.isFileViewVisible = false;
    this.isUploadInProgress = true;
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.fileName);

    this.selectiveCourseService.uploadImportedSelectiveCoursesData(formData).subscribe(
      res => {
        this.correctSelectiveCourses = res.correctSelectiveCourses;
        this.correctSelectiveCourses.forEach(course => course.selected = true);
        this.incorrectSelectiveCourses = res.incorrectSelectiveCourses;
        this.isUploadInProgress = false;
        this.isUploadButtonVisible = false;
        this.isTableViewVisible = true;
      }
    );
  }

  saveImportCourses() {
    const selectiveCoursesForSave = this.getSelectedCourses();
    this.selectiveCourseService.addImportedSelectiveCourses(selectiveCoursesForSave).subscribe(
      response => {
        this.creationResult = response;
        this.modalName = 'Вибіркові дисципліни додано';
        this.isTableViewVisible = !this.isTableViewVisible;
        this.isResultViewVisible = true;
      }
    );
    this.isSaveButtonVisible = true;
  }

  private getSelectedCourses(): ImportSelectiveCourseForSave[] {
     const selectedCourses = this.correctSelectiveCourses.filter(course => course.selected);
     return selectedCourses.map(course => new ImportSelectiveCourseForSave(course, this.degreeId, this.studyYear));
  }

  changeAllIsSelected(isSelected: boolean): void {
    this.correctSelectiveCourses.forEach(course => course.selected = isSelected);
    this.allRowsIsSelected = isSelected;
  }

  coursesSelect() {
     this.allRowsIsSelected = this.correctSelectiveCourses.every(course => course.selected);
  }
}
