import { Component, OnInit } from '@angular/core';
import {StudentStipendService} from '../../../services/student-stipend.service';
import {StudentStipendInfo} from '../../../models/student-stipend/StudentStipendInfo';

@Component({
  selector: 'app-student-stipend',
  templateUrl: './student-stipend.component.html',
  styleUrls: ['./student-stipend.component.scss']
})
export class StudentStipendComponent implements OnInit {
  openInput = 'sting';
  studentStipendInfo: {[groupName: string]: StudentStipendInfo[]} = {};
  selectedStudentGroupName = '';
  numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

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
         ssi.oldExtraPoints = ssi.extraPoints;
       })
    });
  }

  getStudentStipendGroups() {
    return Object.keys(this.studentStipendInfo);
  }
  toNumber(e) {
    if (e !== '') {
      return Number(e);
    } else {
      return e = null;
    }
  }
  makeFinalPoint(extraPoint, grade) {
    return extraPoint + (grade * 0.9);
  }
  showValueInput(e) {
    if (e === null || e === undefined) {
      return '';
    } else {
      return e;
    }
  }

  saveExtraPoints(group) {
    let studentsExtraPoints = [];
    let groupStipendInfo = this.studentStipendInfo[group];
    for (let element of groupStipendInfo) {
      if ( element.extraPoints !== null) {
          studentsExtraPoints.push({studentDegreeId: element.id, points: element.extraPoints});
      }
    }
    this.studentStipendService.sendExtraPoints(studentsExtraPoints);
   }

 }
