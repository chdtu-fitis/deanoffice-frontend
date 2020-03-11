import { Component, OnInit } from '@angular/core';
import {StudentStipendService} from '../../../services/student-stipend.service';
import {StudentStipendInfo} from '../../../models/student-stipend/StudentStipendInfo';
import {SpecialityStudentsStipendInfo} from "../../../models/student-stipend/SpecialityStudentsStipendInfo";

@Component({
  selector: 'app-student-stipend',
  templateUrl: './student-stipend.component.html',
  styleUrls: ['./student-stipend.component.scss']
})
export class StudentStipendComponent implements OnInit {
  openInput = 'sting';
  studentStipendInfo: SpecialityStudentsStipendInfo[] = [];
  selectedGroupsName = '';
  numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  studentRatingLoading = false;

  constructor(private studentStipendService: StudentStipendService) {}

  onMakeDocument(): void {
    this.studentRatingLoading = true;
    this.studentStipendService.buildStudentRatingDocument().subscribe(() => {
        this.studentRatingLoading = false;
      }
    );
  }

  isDebtor(ssi: StudentStipendInfo): string {
    if (ssi.debtCourses.length > 0) {
      return 'debtor';
    } else {
      return '';
    }
  }

  getTuitionTermUkr(tuitionTerm: string) {
    switch (tuitionTerm) {
      case 'REGULAR': return 'Повна';
      case 'SHORTENED': return 'Скороч';
      default: return '';
    }
  }

  getTuitionTermUkrShortened(tuitionTerm: string) {
    return tuitionTerm === 'SHORTENED' ? 'Скороч |' : '';
  }

  ngOnInit() {
     this.studentStipendService.getStudentsStipendInfo().subscribe((studentStipendInfo: SpecialityStudentsStipendInfo[]) => {
       this.studentStipendInfo = studentStipendInfo;
       for (let specialityWithStudents of this.studentStipendInfo) {
         let studentsWithStipendInfo = specialityWithStudents.studentsInfoForStipend;
         studentsWithStipendInfo.forEach(ssi => {
           ssi.oldExtraPoints = ssi.extraPoints;
           ssi.finalPoints = (ssi.extraPoints === 0 || ssi.extraPoints === null) ? ssi.averageGrade * 0.9 : ssi.extraPoints + (ssi.averageGrade * 0.9);
         });
       }
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
    if (e === 'null' || e === undefined) {
      return '';
    } else {
      return e;
    }
  }

  saveExtraPoints(specialityStudentsStipendInfo) {
    const studentsExtraPoints = [];
    for (const element of specialityStudentsStipendInfo.studentsInfoForStipend) {
      if (element.extraPoints !== null && element.extraPoints != element.oldExtraPoints) {
        studentsExtraPoints.push({studentDegreeId: element.id, points: element.extraPoints});
      }
    }
    this.openInput = this.selectedGroupsName = '';
    if (studentsExtraPoints.length > 0) {
      this.studentStipendService.sendExtraPoints(studentsExtraPoints).subscribe(() => {
        for (const element of specialityStudentsStipendInfo.studentsInfoForStipend) {
          element.oldExtraPoints = element.extraPoints;
        }
      });
    }
  }
}
