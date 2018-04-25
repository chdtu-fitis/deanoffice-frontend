import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Grade} from '../../../models/Grade';

@Component({
    selector: 'grades-table',
    templateUrl: './grades-table.component.html',
    styleUrls: ['./grades-table.component.scss']
})
export class GradesTableComponent {
    @Input() studentsDegree;
    @Input() courses;
    @Input() selectGroup;
    @Input() selectSemester;
    @Output() gradesUpdate = new EventEmitter();
    @Output() errors = new EventEmitter();
    grades = [];

    nextCell(e: any, studentId: number, gradeId: number, grade): void {
        if (e.keyCode === 13) {
            this.focusElement(studentId + 1, gradeId, true);
        }
    }

    focusElement(studentId: number, gradeId: number, vertically: boolean): any {
        const id = this.getElementId(studentId, gradeId);
        try {
            const input = document.getElementById(id);
            input.focus();
        } catch (err) {
            if (!vertically) { return; }
            this.focusElement(0, gradeId + 1, false);
        }
    }

    getElementId(studentId: number, gradeId: number): string {
        return `grade${studentId}${gradeId}`;
    }

    editGrade(grade: Grade, studentId: number, gradeId: number): void {
        const id = this.getElementId(studentId, gradeId);
        if (grade.points > 100 || grade.points < 0 || !grade.points) {
            this.setError('Помилка, оцiнка повинна бути бiльша 0 та менша або рiвна 100!');
            this.updateVisible(id, 'bg-danger');
        } else {
            this.setError('');
            this.addGradeForUpdate(grade);
            this.updateVisible(id, 'bg-warning');
        }
    }

    addGradeForUpdate(grade): void {
        const updateGradeId = this.findGradeOfGrades(grade);
        if (updateGradeId >= 0) {
            this.grades[updateGradeId] = grade;
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

    findGradeOfGrades(grade): number {
        if (!this.grades.length) return -1;
        for (let i = 0; i < this.grades.length; i++) {
            if (this.grades[i].id === grade.id) {
                return i;
            }
        }
        return -1;
    }

}
