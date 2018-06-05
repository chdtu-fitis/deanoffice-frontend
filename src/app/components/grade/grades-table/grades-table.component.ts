import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Grade} from '../../../models/Grade';

@Component({
    selector: 'app-grades-table',
    templateUrl: './grades-table.component.html',
    styleUrls: ['./grades-table.component.scss']
})
export class GradesTableComponent {
    @ViewChild('statement') statement;
    @Input() studentsDegree;
    @Input() courses;
    @Input() selectGroup;
    @Input() selectSemester;
    @Output() gradesUpdate = new EventEmitter();
    @Output() errors = new EventEmitter();
    @Output() sendUpdateGrades = new EventEmitter();
    grades = [];
    @Input() loadingGrades = false;

    resetGrades() {
        this.grades = [];
    };

    openStatement(selectedCourse: any): void {
        this.resetGrades();
        this.statement.setSelectedCourse(selectedCourse);
        this.statement.openModalAndUpdateGradesForCourse();
    }

    nextCell(e: any, studentId: number, gradeId: number): void {
        if (e.keyCode === 13) {
            this.focusElement(studentId + 1, gradeId, true);
        }
    }

    focusElement(studentId: number, gradeId: number, vertically: boolean): any {
        const id = this.getElementId(studentId, gradeId);
        try {
            document.getElementById(id).focus();
        } catch (err) {
            if (!vertically) {
                return;
            }
            this.focusElement(0, gradeId + 1, false);
        }
    }

    getElementId(studentId: number, gradeId: number): string {
        return `grade${studentId}${gradeId}id`;
    }

    editGrade(grade: Grade, studentId: number, gradeId: number, e: any): void {
        const id = this.getElementId(studentId, gradeId);
        const points = Number(e.target.valueAsNumber || e.target.value);
        if (points > 100 || points < 0 || !points) {
            this.setError('Помилка, оцiнка повинна бути бiльша 0 та менша або рiвна 100!');
            this.updateVisible(id, 'bg-danger');
        } else {
            this.setError('');
            grade.points = points;
            this.addGradeForUpdate(grade);
            this.updateVisible(id, 'bg-warning');
        }
    }

    updateGradesByStatement(grades: Grade[]) {
        this.gradesUpdate.emit(grades);
        this.sendUpdateGrades.emit();
    }

    addGradeForUpdate(grade): void {
        const findGrade = g => {
            return g.studentDegreeId === grade.studentDegreeId &&
                g.courseId === grade.courseId
        };
        const updateGradeId = this.grades.findIndex(findGrade);
        if (updateGradeId >= 0) {
            this.grades[updateGradeId].points = grade.points;
        } else {
            this.grades.push(grade);
        }
        this.gradesUpdate.emit(this.grades);
    }

    setError(error: string): void {
        this.errors.emit(error);
    }

    updateVisible(id, style): void {
        const element = document.getElementById(id).parentElement;
        const styles = 'text-center align-middle';
        element.setAttribute('class', `${styles} ${style}`);
    }
}
