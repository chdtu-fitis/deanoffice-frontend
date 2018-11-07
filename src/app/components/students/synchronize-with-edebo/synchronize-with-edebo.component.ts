import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {IAppModal} from '../../shared/modal.interface';
import {EdeboService} from '../../../services/edebo.service';
import {StudentDegreeFullEdeboData} from '../../../models/synchronization-edebo-models/StudentDegreeFullEdeboData';
import {MissingPrimaryDataRedDTO} from '../../../models/synchronization-edebo-models/MissingPrimaryDataRedDTO';
import {StudentDegreePrimaryEdeboDataDTO} from '../../../models/synchronization-edebo-models/StudentDegreePrimaryEdeboDataDTO';
import {UnmatchedSecodaryDataStudentDegreeBlue} from '../../../models/synchronization-edebo-models/UnmatchedSecodaryDataStudentDegreeBlue';
import {DiplomaType} from '../../../models/diploma-type.enum';
import {Payment} from '../../../models/payment.enum';
import {DegreeService} from '../../../services/degree.service';
import {Degree} from '../../../models/Degree';
import {SpecialityService} from '../../../services/speciality.service';
import {Speciality} from '../../../models/Speciality';
import {ResultOfSavingData} from '../../../models/synchronization-edebo-models/ResultOfSavingData';

@Component({
  selector: 'synchronize-with-edebo',
  templateUrl: './synchronize-with-edebo.component.html',
  styleUrls: ['./synchronize-with-edebo.component.scss'],
})
export class SynchronizeWithEdeboComponent implements OnInit, IAppModal {
  @ViewChild('modal') modal: ModalDirective;
  uploadInProgress = false;
  fileField = true;
  importView = true;
  resultView = false;
  downloadButton = this.importView;
  selectedFile: File = null;
  fileName = 'Виберіть файл';
  modalName = 'Імпортувати файл';
  modalSize = '';
  isChangedValueOfDb = true;
  synchronizedStudentDegreesGreen: StudentDegreePrimaryEdeboDataDTO[];
  noSuchStudentOrSuchStudentDegreeInDbOrange: StudentDegreeFullEdeboData[];
  missingPrimaryDataRed: MissingPrimaryDataRedDTO[];
  unmatchedSecondaryDataStudentDegreesBlue: UnmatchedSecodaryDataStudentDegreeBlue[];
  absentInFileStudentDegreesYellow: StudentDegreePrimaryEdeboDataDTO[];
  orangeStudentsSelected: boolean;
  studentsInTable: number;
  degrees: Degree[];
  specialities: Speciality[];
  selectedDegree = null;
  selectedSpeciality = null;
  resultOfSaving: ResultOfSavingData;

  ngOnInit() {
  }
  constructor(private edeboService: EdeboService,
              private degreeService: DegreeService,
              private specialityService: SpecialityService) {
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
    if (this.selectedDegree) {
      formData.append('degree', this.selectedDegree);
    }
    if (this.selectedSpeciality) {
      formData.append('speciality', this.selectedSpeciality);
    }
    this.edeboService.uploadFile(formData).subscribe(
        res => {
          this.synchronizedStudentDegreesGreen = res.synchronizedStudentDegreesGreen;
          this.unmatchedSecondaryDataStudentDegreesBlue = res.unmatchedSecondaryDataStudentDegreesBlue;
          this.noSuchStudentOrSuchStudentDegreeInDbOrange = res.noSuchStudentOrSuchStudentDegreeInDbOrange;
          this.missingPrimaryDataRed = res.missingPrimaryDataRed;
          this.absentInFileStudentDegreesYellow = res.absentInFileStudentDegreesYellow;
          this.uploadInProgress = false;
          this.changeModal();
        }
    );
  }

  changeSpeciality(value) {
    this.selectedSpeciality = value;
  }
  changeDegree(value) {
    this.selectedDegree = value;
  }

  onShow(): void {
    this.degreeService.getDegrees().subscribe(
      degrees => {
        this.degrees = degrees;
      }
    );
    this.specialityService.getSpecialities().subscribe(
      speciality => {
        this.specialities = speciality;
        this.fileField = true;
     }
    );
    this.orangeStudentsSelected = false;
    this.fileName = 'Виберіть файл';
    this.modalName = 'Імпортувати файл';
    this.modalSize = '';
    this.importView = true;
    this.modal.show();
  }

  changeModal(): void {
    this.studentsInTable = this.synchronizedStudentDegreesGreen.length;
    this.modalName = 'Студенти';
    this.modalSize = 'modal-full';
    this.importView = !this.importView;
    this.downloadButton = false;
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
      case 'yellow':
        this.studentsInTable = this.absentInFileStudentDegreesYellow.length;
        break;
    }
  };

  saveChanges(): void {
    let newAndUpdatedStudentDegreesDTO = {};
    newAndUpdatedStudentDegreesDTO['newStudentDegrees'] = this.сhooseSelectedStudentsFromOrangeList();
    newAndUpdatedStudentDegreesDTO['studentDegreesForUpdate'] = this.сhooseSelectedStudentsFromBlueList();
    this.edeboService.updateDb(newAndUpdatedStudentDegreesDTO).subscribe(
      request => {
        this.resultOfSaving = request;
        this.modalSize = '';
        this.modalName = 'Дані змінено';
        this.importView = !this.importView;
        this.resultView = true;
      }
    );


  }

  hideModal(): void {
    this.selectedDegree = null;
    this.selectedSpeciality = null;
    this.modal.hide();
    this.resultView = false;
    this.downloadButton = true;
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

   translateDiplomaType(term: DiplomaType) {
    return DiplomaType[term];
  }

  translatePayment(term: Payment) {
    return Payment[term]
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

