import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {ThesisInputService} from '../../../services/thesis-input.service';
import {ThesisByGroups} from '../../../models/thesis-theme-models/ThesisByGroups';
import {MissingThesisDataRedDTO} from '../../../models/thesis-theme-models/MissingThesisDataRedDTO';

@Component({
  selector: 'student-thesis-theme-input',
  templateUrl: './student-thesis-theme-input.component.html',
  styleUrls: ['./student-thesis-theme-input.component.scss']
})
export class StudentThesisThemeInputComponent implements OnInit {
  @ViewChild('modal') modal: ModalDirective;
  fileName = 'Виберіть файл';
  selectedFile: File = null;
  wrongExtension = false;
  uploadInProgress = false;
  fileField = true;
  modalSize = '';
  downloadButton = true;
  saveButton = false;
  tableView = false;
  listThesisDataForGroup: ThesisByGroups[];
  missingThesisDataRed: MissingThesisDataRedDTO[];

  constructor(private thesisService: ThesisInputService) {
  }

  ngOnInit() {
  }

  private checkExtension(file): boolean {
    const extension = file.name.slice(file.name.lastIndexOf('.'));
    return !(extension === '.docx' || extension === '.doc');
  }

  onFileSelected(event) {
    this.selectedFile = <File> event.target.files[0];
    this.wrongExtension = this.checkExtension(this.selectedFile);
    this.fileName = this.selectedFile.name;
  }

  onFileUpload() {
    this.fileField = false;
    this.uploadInProgress = true;

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.thesisService.uploadFile(formData).subscribe(
      res => {
        this.listThesisDataForGroup = res.listThesisDataForGroupDTOs;
        this.missingThesisDataRed = res.missingThesisDataRedDTOs;
        this.uploadInProgress = false;
        this.downloadButton = false;
        this.changeModal();
      }
    );
  }

  changeModal() {
    this.modalSize = 'modal-full';
    this.tableView = true;
  }

  // setNumberOfStudents(tableType): void {
  //   switch (tableType) {
  //     case 'green':
  //       this.studentsInTable = this.synchronizedStudentDegreesGreen.length;
  //       break;
  //     case 'blue':
  //       this.studentsInTable = this.unmatchedSecondaryDataStudentDegreesBlue.length;
  //       break;
  //   }
  // };

  hideModal() {
    this.modal.hide();
    this.tableView = false;
    this.saveButton = false;
    this.modalSize = '';
  }

  saveChanges() {
    this.saveButton = true;
  }

  onAllThesisThemeSelected(checked: boolean, index: number) {
    for (let student of this.listThesisDataForGroup[index].thesis) {
      student.selected = checked;
    }
  }

  onShow() {
    this.fileName = 'Виберіть файл';
    this.fileField = true;
    this.downloadButton = true;
    this.modal.show();
  }
}
