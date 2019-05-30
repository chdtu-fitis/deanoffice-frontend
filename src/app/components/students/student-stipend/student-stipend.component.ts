import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../../services/student.service";
import {StudentStipendService} from "../../../services/student-stipend.service";
import {StudentStipendInfo} from "../../../models/student-stipend/StudentStipendInfo";

@Component({
  selector: 'app-student-stipend',
  templateUrl: './student-stipend.component.html',
  styleUrls: ['./student-stipend.component.scss']
})
export class StudentStipendComponent implements OnInit {
  openInput = false;
  studentStipendInfo: {[groupName: string]: StudentStipendInfo[]} = {};

  constructor(private studentStipendService: StudentStipendService) {
  }

  isDebtor(ssi: StudentStipendInfo): string {
    if(ssi.debtCourses.length > 0)
      return 'debtor';
    else
      return '';
  }

  getTuitionTermUkr(tuitionTerm: string) {
    switch (tuitionTerm) {
      case 'REGULAR': return 'Повна';
      case 'SHORTENED': return 'Скороч';
      default: return '';
    }
  }

  ngOnInit() {
     this.studentStipendService.getStudentsStipendInfo().subscribe((studentStipendInfo: StudentStipendInfo[]) => {
       var info = studentStipendInfo;
       info.forEach(ssi => {
         let currentStudentStipendGroup = this.studentStipendInfo[ssi.groupName];
         if (currentStudentStipendGroup) {
           currentStudentStipendGroup.push(ssi);
         } else {
           this.studentStipendInfo[ssi.groupName] = [];
           this.studentStipendInfo[ssi.groupName].push(ssi);
         }
       })
    });
  }

  getStudentStipendGroups() {
    return Object.keys(this.studentStipendInfo);
  }
  getFinalPoints(finalPoints, grade, extraPoints) {
    return finalPoints = Number(grade) + Number(extraPoints);
  }
}
