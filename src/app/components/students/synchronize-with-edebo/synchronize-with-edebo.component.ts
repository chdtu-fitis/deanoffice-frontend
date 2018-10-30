import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {IAppModal} from '../../shared/modal.interface';
import {EdeboService} from '../../../services/edebo.service';
import {StudentDegreeFullEdeboData} from '../../../models/synchronization-edebo-models/StudentDegreeFullEdeboData';
import {MissingPrimaryDataRedDTO} from '../../../models/synchronization-edebo-models/MissingPrimaryDataRedDTO';
import {StudentDegreePrimaryEdeboDataDTO} from '../../../models/synchronization-edebo-models/StudentDegreePrimaryEdeboDataDTO';
import {UnmatchedSecodaryDataStudentDegreeBlue} from '../../../models/synchronization-edebo-models/UnmatchedSecodaryDataStudentDegreeBlue';

@Component({
  selector: 'synchronize-with-edebo',
  templateUrl: './synchronize-with-edebo.component.html',
  styleUrls: ['./synchronize-with-edebo.component.scss'],
})
export class SynchronizeWithEdeboComponent implements OnInit, IAppModal {
  @ViewChild('modal') modal: ModalDirective;
  uploadInProgress = false;
  fileField = true;
  selectedFile: File = null;
  fileName = 'Виберіть файл';
  importView = true;
  modalName = 'Імпортувати файл';
  modalSize = '';
  isChangedValueOfDb = true;
  synchronizedStudentDegreesGreen: StudentDegreePrimaryEdeboDataDTO[];
  noSuchStudentOrSuchStudentDegreeInDbOrange: StudentDegreeFullEdeboData[];
  missingPrimaryDataRed: MissingPrimaryDataRedDTO[];
  unmatchedSecondaryDataStudentDegreesBlue: UnmatchedSecodaryDataStudentDegreeBlue[];
  orangeStudentsSelected: boolean;
  studentsInTable: number;

  ngOnInit() {
  }
  constructor(private edeboService: EdeboService) {
  }

  onFileSelected(event) {
    this.selectedFile = <File> event.target.files[0];
    this.fileName = this.selectedFile.name;
  }

  onFileUpload(): void {
    this.uploadInProgress = true;
    this.fileField = false;
    let formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.edeboService.uploadFile(formData).subscribe(
        res => {
          this.synchronizedStudentDegreesGreen = res.synchronizedStudentDegreesGreen;
          this.unmatchedSecondaryDataStudentDegreesBlue = res.unmatchedSecondaryDataStudentDegreesBlue;
          this.noSuchStudentOrSuchStudentDegreeInDbOrange = res.noSuchStudentOrSuchStudentDegreeInDbOrange;
          this.missingPrimaryDataRed = res.missingPrimaryDataRed;
          this.uploadInProgress = false;
          this.changeModal();
        }
    );
  }

  onShow(): void {
    this.studentsInTable = 0;
    this.orangeStudentsSelected = false;
    this.fileName = 'Виберіть файл';
    this.importView = true;
    this.fileField = true;
    this.modalName = 'Імпортувати файл';
    this.modalSize = '';
    this.modal.show();
  }

  changeModal(): void {
    this.studentsInTable = this.synchronizedStudentDegreesGreen.length;
    this.modalName = 'Студенти';
    this.modalSize = 'modal-full';
    this.importView = !this.importView;
  }

  onSelectAllStudents(checked: boolean, table: string): void {
    if (table === 'orange') {
      for (let student of this.noSuchStudentOrSuchStudentDegreeInDbOrange) {
        student.selected = checked;
      }
    }
    if (table) {
      for (let student of this.unmatchedSecondaryDataStudentDegreesBlue) {
        student.studentDegreeFromDb.selected = checked;
      }
    }

}
  сhooseSelectedStudentsFromOrangeList(): StudentDegreeFullEdeboData[] {
    let chosenStudents = [];
    for (let student of this.noSuchStudentOrSuchStudentDegreeInDbOrange) {
        if (student.selected) {
          delete student.selected;
          chosenStudents.push(student);
        }
    }
    return chosenStudents;
  }

  сhooseSelectedStudentsFromBlueList(): StudentDegreeFullEdeboData[] {
    let chosenStudents = [];
    for (let student of this.unmatchedSecondaryDataStudentDegreesBlue) {
      if (student.selected) {
        chosenStudents.push(student.studentDegreeFromDb);
      }
    }
    return chosenStudents;
  }

  setNumberOfStudents(tableType): void {
    switch (tableType) {
      case 'green':
        this.studentsInTable = this.synchronizedStudentDegreesGreen.length;
        break;
      case 'blue':
        this.studentsInTable = this.unmatchedSecondaryDataStudentDegreesBlue.length;
        break;
      case 'orange':
        this.studentsInTable = this.noSuchStudentOrSuchStudentDegreeInDbOrange.length;
         break;
      case 'red':
        this.studentsInTable = this.missingPrimaryDataRed.length;
        break;
    }
  };

  saveChanges(): void {
    let newAndUpdatedStudentDegreesDTO = {};
    newAndUpdatedStudentDegreesDTO['newStudentDegrees'] = this.сhooseSelectedStudentsFromOrangeList();
    newAndUpdatedStudentDegreesDTO['studentDegreesForUpdate'] = this.сhooseSelectedStudentsFromBlueList();
    this.edeboService.updateDb(newAndUpdatedStudentDegreesDTO).subscribe();
  }

  hideModal(): void {
    this.modal.hide();
    this.isChangedValueOfDb = true;
  }

  changeBlueListCondition(index): void {
    if (this.isChangedValueOfDb === true) {
      this.isChangedValueOfDb = !(this.isChangedValueOfDb);
    }
    if (this.isChangedValueOfDb === false) {
      this.unmatchedSecondaryDataStudentDegreesBlue[index].selected = true;
    }
  }

  compareValuesInBlueList(name, index): number {
    let numberOfRows = this.unmatchedSecondaryDataStudentDegreesBlue[index].studentDegreeFromDb[name] === this.
      unmatchedSecondaryDataStudentDegreesBlue[index].studentDegreeFromData[name] ? 2 : 1;
    return numberOfRows;
  }

  isEqual(name, index): boolean {
    let isShown = this.unmatchedSecondaryDataStudentDegreesBlue[index].studentDegreeFromDb[name] === this.
      unmatchedSecondaryDataStudentDegreesBlue[index].studentDegreeFromData[name];
    return !isShown;
  }

  replaceDataWithCorrect(index, fieldName): void {

    if (this.unmatchedSecondaryDataStudentDegreesBlue[index].studentDegreeFromData[fieldName] == null) {
      return;
    }
    if (fieldName === 'admissionDate') {
      this.unmatchedSecondaryDataStudentDegreesBlue[index].studentDegreeFromDb[fieldName] =
        this.unmatchedSecondaryDataStudentDegreesBlue[index].studentDegreeFromData[fieldName];
      this.changeBlueListCondition(index);
      return;
    }
    this.changeBlueListCondition(index);
    this.unmatchedSecondaryDataStudentDegreesBlue[index].studentDegreeFromDb[fieldName] = this.
        unmatchedSecondaryDataStudentDegreesBlue[index].studentDegreeFromData[fieldName];
  }
}

