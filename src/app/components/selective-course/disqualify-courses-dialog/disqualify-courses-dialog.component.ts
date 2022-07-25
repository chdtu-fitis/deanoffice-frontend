import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {SelectiveCourse} from '../../../models/SelectiveCourse';
import {SelectiveCoursesYearParameters} from "../../../models/SelectiveCoursesYearParameters";
import {Degree} from "../../../models/degree.enum";
import {TypeCycle} from "../../../models/TypeCycle";

@Component({
  selector: 'disqualify-courses-dialog',
  templateUrl: './disqualify-courses-dialog.component.html',
  styleUrls: ['./disqualify-courses-dialog.component.scss']
})
export class DisqualifyCoursesDialogComponent implements OnInit {
  studyYear: string;
  degreeId: number;
  semester: number;
  yearParameters: SelectiveCoursesYearParameters;

  minGeneralStudentsCount: number;
  minProfessionalStudentsCount: number;

  selectiveCourses: SelectiveCourse[] = [];

  constructor(public bsModalRef: BsModalRef,
              private selectiveCourseService: SelectiveCourseService) { }

  ngOnInit() {
    if (this.degreeId == Degree.BACHELOR) {
      this.minGeneralStudentsCount = this.yearParameters.bachelorGeneralMinStudentsCount;
      this.minProfessionalStudentsCount = this.yearParameters.bachelorProfessionalMinStudentsCount;
    } else if (this.degreeId == Degree.MASTER) {
      this.minGeneralStudentsCount = this.yearParameters.masterGeneralMinStudentsCount;
      this.minProfessionalStudentsCount = this.yearParameters.masterProfessionalMinStudentsCount;
    } else if (this.degreeId == Degree.PHD) {
      this.minGeneralStudentsCount = this.yearParameters.phdGeneralMinStudentsCount;
      this.minProfessionalStudentsCount = this.yearParameters.phdProfessionalMinStudentsCount;
    }
    this.selectiveCourseService.getSelectiveCoursesWithStudentsCount(this.studyYear, this.degreeId, this.semester)
      .subscribe((selectiveCourses: SelectiveCourse[]) => {
        // const selectiveCoursesToApprove = [], selectiveCoursesToDecline = [];
        // selectiveCourses.forEach(sc => {
        //   if ((TypeCycle[sc.trainingCycle] == TypeCycle.GENERAL && sc.studentsCount >= this.minGeneralStudentsCount) ||
        //     (TypeCycle[sc.trainingCycle] == TypeCycle.PROFESSIONAL && sc.studentsCount >= this.minProfessionalStudentsCount))
        //     selectiveCoursesToApprove.push(sc);
        //   else {
        //     sc.selected = true;
        //     selectiveCoursesToDecline.push(sc);
        //   }
        // });
        // this.selectiveCourses = selectiveCoursesToApprove.concat(selectiveCoursesToDecline);
        selectiveCourses.forEach(sc => {
          if (!((TypeCycle[sc.trainingCycle] == TypeCycle.GENERAL && sc.studentsCount >= this.minGeneralStudentsCount) ||
                (TypeCycle[sc.trainingCycle] == TypeCycle.PROFESSIONAL && sc.studentsCount >= this.minProfessionalStudentsCount)))
            sc.selected = true;
        });
        this.selectiveCourses = selectiveCourses;
      }, error => {
        console.log(error);
      });
  }

  onSubmit() {
    let selectiveCourseIds = this.selectiveCourses.filter(sc => sc.selected).map(sc => sc.id);
    this.selectiveCourseService.disqualifySelectiveCourses(selectiveCourseIds).subscribe(() => {
      this.bsModalRef.hide();
    });
  }

}
