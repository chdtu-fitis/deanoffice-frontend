import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Degree} from '../../../models/Degree';
import {RegisteredStudentsStatistics} from './models/RegisteredStudentsStatistics';
import {DegreeService} from '../../../services/degree.service';
import {SelectiveCourseStatisticsService} from "../../../services/selective-course-statistics.service";
import * as XLSX from "xlsx";

@Component({
  selector: 'students-statistics-of-selective-courses',
  templateUrl: './students-statistics-of-selective-courses.component.html',
  styleUrls: ['./students-statistics-of-selective-courses.component.scss']
})
export class StudentsStatisticsOfSelectiveCoursesComponent implements OnInit {
  degrees: Degree[] = [];
  currentDegree: Degree;
  testNumber: number[] = [1,2,3,4,5,6]
  averagePercent: number = 0;
  fileName = "ExcelSheet.xlsx";
  selectedYear: number;
  whichTable = 0;
  currentTableName: string;
  registeredStudentsStatistics: RegisteredStudentsStatistics[];
  selectiveStatisticsCriteria: string = "YEAR";
  selectiveStatisticsCriteriaOfCurrentTable: string = "YEAR";

  constructor(public bsModalRef: BsModalRef, private degreeService: DegreeService,
              private selectiveCourseStatisticsService: SelectiveCourseStatisticsService) { }

  ngOnInit() {
    this.degreeService.getDegrees().subscribe(degrees => {
      this.degrees = degrees;
      if (this.degrees) {
        this.currentDegree = this.degrees[0];
      }
    });
  }

  showPercentOfStudentsWhoDidChoice() {
    this.whichTable = 1;
    this.averagePercent = 0;
    this.currentTableName = "excel-table-1";
    this.selectiveCourseStatisticsService.getStudentsPercentWhoChosenSelectiveCourse(this.selectedYear,this.currentDegree.id,this.selectiveStatisticsCriteria).subscribe(data => {
      this.registeredStudentsStatistics = data;
      this.registeredStudentsStatistics.forEach((elem) => {
        this.averagePercent += elem.percent;
      });
      this.averagePercent /= (this.registeredStudentsStatistics.length);
    });
    this.selectiveStatisticsCriteriaOfCurrentTable = this.selectiveStatisticsCriteria;
  }

  showListOfStudentsWhoDidNotChoice() {
    this.whichTable = 2;
    this.currentTableName = "excel-table-2"
    console.log(this.currentDegree)
    this.selectiveCourseStatisticsService.getStudentsNotSelectedSelectiveCourse(this.selectedYear, this.currentDegree.id).subscribe(data => {
      this.registeredStudentsStatistics = data;
    });
    console.log(this.registeredStudentsStatistics)
  }

  studentsWithUnexpectedAmountOfCourses() {
    this.whichTable = 3;
    this.currentTableName = "excel-table-3"
  }

  exportTableIntoCsv(): void {
    let element = document.getElementById(this.currentTableName);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Statistics");

    XLSX.writeFile(wb, this.fileName)
  }

}
