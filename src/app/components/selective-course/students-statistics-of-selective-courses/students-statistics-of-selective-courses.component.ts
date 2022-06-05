import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Degree} from '../../../models/Degree';
import {RegisteredStudentsStatistics} from './models/RegisteredStudentsStatistics';
import {DegreeService} from '../../../services/degree.service';
import {SelectiveCourseStatisticsService} from "../../../services/selective-course-statistics.service";
import * as XLSX from "xlsx";
import {document} from 'ngx-bootstrap';

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
  csv_data = [];

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
    console.log(this.registeredStudentsStatistics);
  }

  showListOfStudentsWhoDidNotChoice() {
    this.whichTable = 2;
    this.currentTableName = "excel-table-2"
    this.selectiveCourseStatisticsService.getStudentsNotSelectedSelectiveCourse(this.selectedYear, this.currentDegree.id).subscribe(data => {
      this.registeredStudentsStatistics = data;
    });
    console.log(this.registeredStudentsStatistics)
  }

  studentsWithUnexpectedAmountOfCourses() {
    this.whichTable = 3;
    this.currentTableName = "excel-table-3";
    const groupId = 1;
    this.selectiveCourseStatisticsService.getRegistredStudentsName(this.selectedYear, groupId).subscribe(data => {
      this.registeredStudentsStatistics = data;
    });
    console.log(this.registeredStudentsStatistics)
  }

  exportTableIntoXLSX(): void {
    let element = document.getElementById(this.currentTableName);
    if (element){
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Statistics");

      XLSX.writeFile(wb, this.fileName)
    }
  }

  exportTableIntoCSV() {
    const table = document.getElementById(this.currentTableName);
    let csvContent = [];
    if (table){
      const trs = table.querySelectorAll("tr");
      console.log(trs);
      for (let i = 0; i < trs.length; i++){
        const tds = trs[i].children;
        let data = [];
        for (let j = 0; j < tds.length; j++){
          data.push(tds[j].innerHTML)
        }
        csvContent.push(data.join(","));
      }
      const csvContentStr = csvContent.join("\n");
      const csvContentUrl = "data:text/csv;charset=Windows-1251,"+csvContentStr;
      this.downloadCSVFile(csvContentUrl, "table.csv")
      console.log(csvContentStr)
    }
  }

  downloadCSVFile(url, filename) {
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

}
