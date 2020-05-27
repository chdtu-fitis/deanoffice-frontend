import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

import {IAppModal} from '../../shared/modal.interface';
import {GradeService} from '../../../services/grade.service';
import {CourseForGroup} from '../../../models/CourseForGroup';
import {StudentDegree} from '../../../models/StudentDegree';
import {Grade} from '../../../models/Grade';

@Component({
    selector: 'app-grades-statement',
    templateUrl: './statement.component.html',
    styleUrls: ['./statement.component.scss'],
    providers: [GradeService]
})
export class StatementComponent implements IAppModal {
    @ViewChild('modal', { static: false }) modal: ModalDirective;
    @Input() studentsDegree;
    @Input() selectGroup;
    @Output() sendGrades = new EventEmitter();
    @Output() resetGradesForTable = new EventEmitter();
    selectedCourseForGroup: CourseForGroup;
    updateGrades: Grade[] = [];
    error = '';
    statement: StudentDegree[] = [];
    passedOnTime: StudentDegree[]  = [];
    grades: Grade[];
    loadingGrades = false;
    studentDegrees: StudentDegree[] = [];

    constructor(private gradeService: GradeService) {
    }

    updateGradesByGroupIdAndCourseId() {
        this.loadingGrades = false;
        return this.gradeService.getGradesByGroupIdAndCourseId(this.selectGroup.id, this.selectedCourseForGroup.course.id)
            .subscribe(grades => {
                this.grades = grades;
                this.studentDegrees = this.joinGradeForStudentsDegree();
                this.updateStatementAndPassedOnTime();
                this.loadingGrades = true;
            });
    }

    joinGradeForStudentsDegree() {
        const students = [];
        for (const studentDegree of this.studentsDegree) {
            let t = false;
            for (const grade of this.grades) {
                if (grade.studentDegreeId === studentDegree.id) {
                    studentDegree.grade = grade;
                    students.push(studentDegree);
                    t = true;
                }
            }
            if (!t) {
                studentDegree.grade = new Grade(null, true, this.selectedCourseForGroup.course.id,
                  this.selectedCourseForGroup.academicDifference, studentDegree.id, true);
                students.push(studentDegree);
            }
        }
        return students;
    }

    openModalAndUpdateGradesForCourse() {
        this.updateGradesByGroupIdAndCourseId();
        this.modal.show();
    }

    updateStatementAndPassedOnTime(): void {
        const temp = this.getStatementAndPassedOfTimeStudents();
        this.setStatement(temp.statement);
        this.setPassedOnTime(temp.passedOnTime);
    }

    getStatementAndPassedOfTimeStudents(): {statement: StudentDegree[], passedOnTime: StudentDegree[]} {
      const statement = [];
      const passedOnTime = [];
      for (const student of this.studentDegrees) {
        if (student.grade.onTime) {
          statement.push(student);
        } else {
          passedOnTime.push(student);
        }
      }
      return {statement, passedOnTime};
    }

    toUpdateGrades(studentDegree: StudentDegree): void {
      const grade = studentDegree.grade;
      this.changeOnTimeForGrade(studentDegree, studentDegree.grade.onTime);
      const findGrade = g => {
        return g.studentDegreeId === grade.studentDegreeId && g.courseId === grade.courseId
      };
      const gradeId = this.updateGrades.findIndex(findGrade);
      if (gradeId > -1) {
        this.updateGrades[gradeId] = grade;
      } else {
        this.updateGrades.push(grade);
      }
    }

    changeOnTimeForGrade(studentDegree: StudentDegree, onTime: boolean): void {
      const findStudentIndex = student => student.id === studentDegree.id;
      if (onTime) {
        const index = this.passedOnTime.findIndex(findStudentIndex);
        if (index > -1) {
          this.statement.push(studentDegree);
          this.passedOnTime.splice(index, 1);
        }
      } else {
        const index = this.statement.findIndex(findStudentIndex);
        if (index > -1) {
          this.passedOnTime.push(studentDegree);
          this.statement.splice(index, 1);
        }
      }
    }

    setStatement(statement: StudentDegree[]): void {
      this.statement = statement;
    }

    setPassedOnTime(passedOnTime: StudentDegree[]): void {
      this.passedOnTime = passedOnTime;
    }

    setError(error: string): void {
        this.error = error;
    }

    setSelectedCourseForGroup(selectedCourseForGroup: CourseForGroup): void {
      this.selectedCourseForGroup = selectedCourseForGroup;
    }

    resetGrades(): void {
        this.updateGrades = [];
        this.resetGradesForTable.emit();
    };

    closeModal(): void {
      this.resetGrades();
      this.error =  '';
      this.modal.hide();
    }

    cancelChanges(): void {
      this.resetGrades();
      this.loadingGrades = false;
      this.error =  '';
      this.updateGradesByGroupIdAndCourseId();
    }

    sendUpdateGrades() {
        this.sendGrades.emit(this.updateGrades);
        this.resetGrades();
        this.modal.hide();
    }
}
