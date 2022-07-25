import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Degree} from '../../../models/Degree';
import {RegisteredStudentsStatistics} from './models/RegisteredStudentsStatistics';
import {StudentsNotRegisteredForSelectiveCourses} from '../../../models/StudentsNotRegisteredForSelectiveCourses';
import {StudentSelectiveCourseMoreOrLessNorm} from '../../../models/StudentSelectiveCourseMoreOrLessNorm';
import {DegreeService} from '../../../services/degree.service';
import {SelectiveCourseStatisticsService} from "../../../services/selective-course-statistics.service";
import {SelectiveCourseAnomalyService} from '../../../services/selective-course-anomaly.service';
import * as XLSX from "xlsx";
import {document} from 'ngx-bootstrap';

@Component({
  selector: 'students-statistics-of-selective-courses',
  templateUrl: './selective-courses-statistics.component.html',
  styleUrls: ['./selective-courses-statistics.component.scss']
})
export class SelectiveCoursesStatisticsComponent implements OnInit {
  degrees: Degree[] = [];
  currentDegree: Degree;
  selectedCourse: number = 0;
  moreNorm: string = "less";
  courses: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  averagePercent: number = 0;
  fileName = "ExcelSheet.xlsx";
  selectedYear: number;
  whichTable = 0;
  currentTableName: string;
  registeredStudentsStatistics: RegisteredStudentsStatistics[];
  studentsNotRegistered: StudentsNotRegisteredForSelectiveCourses[];
  studentsAnomaly: StudentSelectiveCourseMoreOrLessNorm[];
  selectiveStatisticsCriteria: string = "YEAR";
  selectiveStatisticsCriteriaOfCurrentTable: string = "YEAR";
  ASC: string = "ASC";
  DESC: string = "DESC";
  sortingOrder = {"facultyName": this.ASC, "department": this.ASC, "groupName": this.ASC, "specializationName": this.ASC,
                  "studyYear": this.ASC, "totalCount": this.ASC, "registeredCount": this.ASC,
                  "registeredPercent": this.ASC, "notRegisteredPercent": this.ASC, "notRegisteredCount": this.ASC,
                  "choosingLessCount": this.ASC, "choosingLessPercent": this.ASC};

  constructor(public bsModalRef: BsModalRef, private degreeService: DegreeService,
              private selectiveCourseStatisticsService: SelectiveCourseStatisticsService,
              private selectiveCourseAnomalyService: SelectiveCourseAnomalyService) { }

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

  showNoChoiceStudents() {
    this.whichTable = 2;
    this.currentTableName = "excel-table-2"
    this.selectiveCourseStatisticsService.getStudentsNotSelectedSelectiveCourse(this.selectedYear, this.currentDegree.id).subscribe(data => {
      this.studentsNotRegistered = data;
    });
  }

  studentsWithUnexpectedAmountOfCourses() {
    this.whichTable = 3;
    this.currentTableName = "excel-table-3";
    this.selectiveCourseAnomalyService.getStudentsSelectedSelectiveCoursesMoreNorm(this.currentDegree.id,
      this.selectedYear,
      this.selectedCourse,
      this.moreNorm === "less" ? false : true).subscribe(data =>{
      this.studentsAnomaly = data;
    });
  };

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

  handleColSort(colName) {
    this.registeredStudentsStatistics.sort((a,b) => {
      if (colName === "facultyName" || colName === "department" || colName === "groupName"
          || colName === "specializationName"){
        if (this.sortingOrder[colName] === this.ASC){
          return parseInt(a[colName].toString().toLowerCase(), 36) - parseInt(b[colName].toString().toLowerCase(), 36);
        } else {
          return parseInt(b[colName].toString().toLowerCase(), 36) - parseInt(a[colName].toString().toLowerCase(), 36);
        }
      } else {
        if (this.sortingOrder[colName] === this.ASC){
          return a[colName] - b[colName];
        } else{
          return b[colName] - a[colName];
        }
      }
    });
    if (this.sortingOrder[colName] === this.ASC){
      this.sortingOrder[colName] = this.DESC
    } else {
      this.sortingOrder[colName] = this.ASC
    }
  }

}
