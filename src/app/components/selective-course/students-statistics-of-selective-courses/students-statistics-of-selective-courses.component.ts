import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {StudentDegree} from '../../../models/StudentDegree';
import {Degree} from '../../../models/Degree';
import {DegreeService} from '../../../services/degree.service';
import * as XLSX from "xlsx";

@Component({
  selector: 'students-statistics-of-selective-courses',
  templateUrl: './students-statistics-of-selective-courses.component.html',
  styleUrls: ['./students-statistics-of-selective-courses.component.scss']
})
export class StudentsStatisticsOfSelectiveCoursesComponent implements OnInit {
  students: StudentDegree[];
  testNumber = ["fetr", "fitis", "feu", "fktmd"];
  degrees: Degree[] = [];
  currentDegree: Degree;
  averagePercent = 100
  fileName = "ExcelSheet.xlsx";

  constructor(public bsModalRef: BsModalRef, private degreeService: DegreeService,) { }

  ngOnInit() {

    this.degreeService.getDegrees().subscribe(degrees => {
      this.degrees = degrees;
      if (this.degrees) {
        this.currentDegree = this.degrees[0];
        this.onDegreeChange();
      }
    });


  }

  onDegreeChange() {
    console.log(this.currentDegree)
  }

  showPercentOfStudentsWhoDidChoice() {

  }

  showListOfStudentsWhoDidNotChoice() {

  }
  studentsWithUnexpectedAmountOfCourses() {

  }

  exportTableIntoCsv(): void {
    let element = document.getElementById("excel-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Statistics");

    XLSX.writeFile(wb, this.fileName)
  }

}
