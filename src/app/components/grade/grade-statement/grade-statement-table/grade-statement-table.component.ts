import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Grade} from '../../../../models/Grade';

@Component({
    selector: 'app-grade-statement-table',
    templateUrl: './grade-statement-table.component.html',
    styleUrls: ['./grade-statement-table.component.scss']
})
export class GradeStatementTableComponent {
    @Input() studentsDegree;
    @Input() selectedCourse: any;
    @Input() onTime = false;
    @Input() loadingGrades = false;
    @Output() setGrade = new EventEmitter();
    @Output() error = new EventEmitter();

    isCorrectGrade(studentDegree: any): any {
        return {
            'notCorrect': !studentDegree.grade.empty &&
            (studentDegree.grade.points < 60 || studentDegree.grade.points > 100)
        };
    }

    setUpdateGrades(studentDegree: any): any {
        return this.setGrade.emit({studentDegree, onTime: this.onTime});
    }

    changeOnTime(studentId: number) {
        this.studentsDegree[studentId].grade.onTime = !this.studentsDegree[studentId].grade.onTime;
        this.setUpdateGrades(this.studentsDegree[studentId]);
    }

    nextCell(studentDegreeId: number, studentId: number, grade: Grade, e: any): void {
        if (e.keyCode === 13) {
            const studentDegreeIndex = this.studentsDegree.findIndex(studentDegree => {
                return studentDegree.id === studentDegreeId;
            });
            this.editGrade(studentDegreeId, studentId, grade, e);
            if (this.studentsDegree.length > studentDegreeIndex + 1) {
                this.focusElement(this.studentsDegree[studentDegreeIndex + 1].id);
            }
        }
    }

    focusElement(studentDegreeId: number): any {
        const id = this.getElementId(studentDegreeId);
        try {
            document.getElementById(id).focus();
        } catch (e) {
        }
    }

    getElementId(studentDegreeId: number): string {
        return `id${studentDegreeId}${this.selectedCourse.course.id}`;
    }

    editGrade(studentDegreeId: number, studentId: number, grade: Grade, e: any): void {
        const elementId = this.getElementId(studentDegreeId);
        const studentDegree = this.studentsDegree[studentId];
        const points = Number(e.target.valueAsNumber || e.target.value);
        if (points > 100 || points < 0 || !points) {
            this.updateVisible(elementId, 'bg-danger');
            this.setError('Помилка, оцiнка повинна бути бiльша 0 та менша або рiвна 100!');
        } else {
            this.setError('');
            if (studentDegree.grade.points !== points) {
                if (!studentDegree.grade.points) {
                    studentDegree.grade.onTime = true;
                }
                studentDegree.grade.points = points;
                delete studentDegree.grade.empty;
                this.setUpdateGrades(studentDegree);
                this.updateVisible(elementId, 'bg-warning');
            }
        }
    }

    setError(error: string): void {
        this.error.emit(error);
    }

    updateVisible(id, style): void {
        const element = document.getElementById(id).parentElement;
        const styles = 'text-center align-middle';
        element.setAttribute('class', `${styles} ${style}`);
    }
}
