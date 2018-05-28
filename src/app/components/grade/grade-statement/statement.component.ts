import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {IAppModal} from '../../shared/modal.interface';
import {Grade} from '../../../models/Grade';
import {GradeService} from '../../../services/grade.service';
import {EmptyGrade} from '../EmptyGrade';

@Component({
    selector: 'app-grades-statement',
    templateUrl: './statement.component.html',
    styleUrls: ['./statement.component.scss'],
    providers: [GradeService]
})
export class StatementComponent implements IAppModal {
    @ViewChild('modal') modal: ModalDirective;
    @Input() studentsDegree;
    @Input() selectGroup;
    @Input() courses;
    @Output() sendGrades = new EventEmitter();
    @Output() resetGradesForTable = new EventEmitter();
    selectedCourse: any;
    updateGrades = [];
    error = '';
    statement = [];
    passedOnTime = [];
    grades: any;
    loadingGrades = false;
    students = [];

    constructor(private gradeService: GradeService) {
    }

    updateGradesByGroupIdAndCourseId() {
        this.loadingGrades = false;
        return this.gradeService.getGradesByGroupIdAndCourseId(this.selectGroup.id, this.selectedCourse.course.id)
            .subscribe(grades => {
                this.grades = grades;
                this.students = this.joinGradeForStudentsDegree();
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
                studentDegree.grade = new EmptyGrade(null, true, this.selectedCourse.course.id, studentDegree.id, false);
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

    getStatementAndPassedOfTimeStudents(): any {
        const statement = [];
        const passedOnTime = [];
        for (const student of this.students) {
            if (student.grade.onTime) {
                statement.push(student);
            } else {
                passedOnTime.push(student);
            }
        }
        return {statement, passedOnTime};
    }

    toUpdateGrades(options: any): void {
        const studentDegree = options.studentDegree;
        const onTime = options.onTime;
        const grade = options.studentDegree.grade;
        if (onTime !== studentDegree.grade.onTime) this.changeOnTimeForGrade(options.studentDegree, options.onTime);
        const findGrade = g => {
            return g.studentDegreeId === grade.studentDegreeId &&
                g.courseId === grade.courseId
        };
        const gradeId = this.updateGrades.findIndex(findGrade);
        if (gradeId > -1) {
            this.updateGrades[gradeId] = grade;
        } else {
            this.updateGrades.push(grade);
        }
    }

    changeOnTimeForGrade(studentDegree: any, onTime: boolean): void {
        const findStudentIndex = student => {
            return student.id === studentDegree.id;
        };
        if (onTime) {
            const index = this.statement.findIndex(findStudentIndex);
            if (index > -1) {
                this.passedOnTime.push(studentDegree);
                this.statement.splice(index, 1);
            }
        } else {
            const index = this.passedOnTime.findIndex(findStudentIndex);
            if (index > -1) {
                this.statement.push(studentDegree);
                this.passedOnTime.splice(index, 1);
            }
        }
    }

    setStatement(statement: any): void {
        this.statement = statement;
    }

    setPassedOnTime(passedOnTime: any): void {
        this.passedOnTime = passedOnTime;
    }

    setError(error: string): void {
        this.error = error;
    }

    setSelectedCourse(selectedCourse: any): void {
        this.selectedCourse = selectedCourse;
    }

    resetGrades(): void {
        this.updateGrades = [];
        this.resetGradesForTable.emit();
    };

    closeModal(): void {
        this.resetGrades();
        this.modal.hide();
    }

    cancelChanges(): void {
        this.resetGrades();
        this.loadingGrades = false;
        this.updateGradesByGroupIdAndCourseId();
    }

    sendUpdateGrades() {
        this.sendGrades.emit(this.updateGrades);
        this.resetGrades();
        this.modal.hide();
    }
}