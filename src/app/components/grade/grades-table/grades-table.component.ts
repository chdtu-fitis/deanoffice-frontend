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

    resetGrades() {
        this.grades = [];
    };

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
            this.grades[updateGradeId].points = grade.points;
        } else {
            this.grades.push(this.gradeEntity(grade));
        }
        this.gradesUpdate.emit(this.grades);
    }

    setError(error: string): void {
        this.errors.emit(error);
    }

    gradeEntity(grade: any) {
        const tempGgrade: any = {
            studentDegree: {
                id: grade.studentDegreeId || grade.studentDegree.id
            },
            course: {
                id: grade.courseId || grade.course.id
            },
            points: grade.points
        };
        if (grade.id) tempGgrade.id = grade.id;

        return tempGgrade;
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
