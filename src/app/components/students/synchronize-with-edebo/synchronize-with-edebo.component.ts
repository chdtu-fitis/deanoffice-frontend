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
  synchronizedStudentDegreesGreen: StudentDegreePrimaryEdeboDataDTO[];
  noSuchStudentOrSuchStudentDegreeInDbOrange: StudentDegreeFullEdeboData[];
  missingPrimaryDataRed: MissingPrimaryDataRedDTO[];
  unmatchedSecondaryDataStudentDegreesBlue: UnmatchedSecodaryDataStudentDegreeBlue[];
  orangeStudentsSelected: boolean;
  blueStudentsSelected: boolean;
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

  convertDate(miliseconds): String {
    let fullDate = new Date(miliseconds);
    let month , date;
    fullDate.getMonth() < 10 ? month = '0' + fullDate.getMonth() : month = fullDate.getMonth();
    fullDate.getDate() < 10 ? date = '0' + fullDate.getDate() : date = fullDate.getDate();
    let stringDate = date + '.' + month + '.' + fullDate.getFullYear();
    return stringDate;
  }

  onSelectAllStudents(checked: boolean, table: string): void {
    if (table === 'orange') {
      for (let student of this.noSuchStudentOrSuchStudentDegreeInDbOrange) {
        student.selected = checked;
      }
    } else {
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
    newAndUpdatedStudentDegreesDTO['studentDegreesForUpdate'] = [];
    this.edeboService.updateDb(newAndUpdatedStudentDegreesDTO).subscribe();
    this.modal.hide();
  }
}

