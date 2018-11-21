import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {ThesisInputService} from '../../../services/thesis-input.service';

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
  tableView = false;

  constructor(private thesisService: ThesisInputService) { }

  ngOnInit() {
  }

  private checkExtension(file): boolean {
    const extension = file.name.slice(file.name.lastIndexOf('.'));
    console.log(extension);
    return !(extension === '.docx' || extension === '.doc');
  }

  onFileSelected (event) {
    this.selectedFile = <File> event.target.files[0];
    this.wrongExtension = this.checkExtension(this.selectedFile);
    this.fileName = this.selectedFile.name;
  }

  onFileUpload () {
    this.uploadInProgress = true;
    this.fileField = false;
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.thesisService.uploadFile(formData).subscribe(
      res => {

        this.uploadInProgress = false;
        this.changeModal();
      }
    );
  }

  changeModal () {
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

}
