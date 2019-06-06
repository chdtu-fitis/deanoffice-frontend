import { Component, OnInit } from '@angular/core';
import {StudentStipendService} from '../../../services/student-stipend.service';
import {StudentStipendInfo} from '../../../models/student-stipend/StudentStipendInfo';
import {StudentIds} from '../../../models/student-stipend/StudentIds';

@Component({
  selector: 'app-student-stipend',
  templateUrl: './student-stipend.component.html',
  styleUrls: ['./student-stipend.component.scss']
})
export class StudentStipendComponent implements OnInit {
  openInput = false;
  studentStipendInfo: {[groupName: string]: StudentStipendInfo[]} = {};
  extraPoints: number;
  studentId: number;
  studentsArray = [];
  studentIds: StudentIds;

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
  makeFinalPoint(extraPoint, grade) {
    extraPoint = Number(extraPoint);
    return extraPoint + (grade * 0.9);
  }
  sendDateToBackend(group) {
    for (let element of this.studentStipendInfo[group]) {
      if (isNaN(element.extraPoints) === false) {
        this.studentId = element.id;
        this.extraPoints = element.extraPoints;
        this.studentIds.id = this.studentId;
        this.studentIds.extraPoints = this.extraPoints;
        //this.studentsArray.push(`${element.groupName} ${this.studentId}  ${this.extraPoints}`);
      }
    }
    console.log(this.studentsArray);
   }
  equatingToTen(extraPoint) {
    if (extraPoint > 10) {
      return extraPoint=10;
    } else {
      return  extraPoint;
    }
  }
 }
