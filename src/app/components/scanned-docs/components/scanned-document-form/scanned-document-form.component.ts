import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { ScannedDocsService } from '../../services/scanned-docs.service';
import { ScannedDocument, ScannedDocumentStudent } from '../../models/scanned-document';

@Component({
  selector: 'scanned-document-form',
  templateUrl: './scanned-document-form.component.html',
  styleUrls: ['./scanned-document-form.component.scss']
})
export class ScannedDocumentFormComponent implements OnChanges {
  @Input() scannedDocument: ScannedDocument;

  scannedDocumentForm = this.fb.group({
    courseName: ['', Validators.required],
    groupName: ['', Validators.required],
    students: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder,
    private sd: ScannedDocsService
  ) { }

  ngOnChanges(): void {
    this.fetchData();
  }

  get courseName(): FormControl {
    return this.scannedDocumentForm.get('courseName') as FormControl;
  }

  get groupName(): FormControl {
    return this.scannedDocumentForm.get('groupName') as FormControl;
  }

  get students(): FormArray {
    return this.scannedDocumentForm.get('students') as FormArray;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    event.stopImmediatePropagation();

    console.log(this.scannedDocumentForm);
  }

  onRemoveStudent(id: number): void {
    this.students.removeAt(id);
  }

  private addStudent(stud: ScannedDocumentStudent): void {
    this.students.push(this.fb.group({
      name: [stud.name],
      grade: [stud.grade]
    }));
  }

  private resetForm(): void {
    this.courseName.setValue('');
    this.groupName.setValue('');

    while (this.students.length) {
      this.students.removeAt(0);
    }
  }

  private fillForm(doc: ScannedDocument): void {
    this.courseName.setValue(doc.courseName);
    this.groupName.setValue(doc.groupName);
    doc.students.forEach((stud: ScannedDocumentStudent) => this.addStudent(stud));
  }

  private fetchData(): void {
    this.sd
      .fetchItem(this.scannedDocument)
      .subscribe((doc: ScannedDocument) => {
        this.resetForm();
        this.fillForm(doc);
      });
    ;
  }
}
