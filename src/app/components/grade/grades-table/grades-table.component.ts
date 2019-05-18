import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Grade} from '../../../models/Grade';
import {CourseForGroup} from '../../../models/CourseForGroup';

@Component({
    selector: 'app-grades-table',
    templateUrl: './grades-table.component.html',
    styleUrls: ['./grades-table.component.scss']
})
export class GradesTableComponent {
    @ViewChild('statement') statement;
    @Input() studentsDegree;
    @Input() coursesForGroup;
    @Input() selectGroup;
    @Input() selectSemester;
    @Output() gradesUpdate = new EventEmitter();
    @Output() errors = new EventEmitter();
    @Output() sendUpdateGrades = new EventEmitter();
    @Output() setGradeForDelete = new EventEmitter();
    grades: Grade[] = [];
    @Input() loadingGrades = false;
    @Input() isDeleteMode = false;
    selectedGradeForDelete: Grade;

    resetGrades() {
        this.grades = [];
    };

    openStatement(selectedCourseForGroup: CourseForGroup): void {
        this.resetGrades();
        this.statement.setSelectedCourseForGroup(selectedCourseForGroup);
        this.statement.openModalAndUpdateGradesForCourse();
    }

    nextCell(e: any, studentId: number, gradeId: number): void {
        if (e.keyCode === 13) {
            this.focusElement(studentId + 1, gradeId, true);
        }
    }

    focusElement(studentId: number, gradeId: number, vertically: boolean): void {
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
        const points = Number(e.target.valueAsNumber || e.target.value);
        if (points > 100 || points < 0 || !points) {
          grade.wrongInterval = true;
          grade.changed = true;
          this.setError('Помилка, оцiнка повинна бути бiльша 0 та менша або рiвна 100!');
        } else {
          this.setError('');
          grade.wrongInterval = false;
          grade.changed = true;
          grade.points = points;
          this.addGradeForUpdate(grade);
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

    sendSelectGrade(): void {
        this.setGradeForDelete.emit(this.selectedGradeForDelete);
    }

    selectGradeForDelete(grade: Grade): void {
        this.selectedGradeForDelete = grade;
        this.sendSelectGrade();
    }

    resetSelectGradeForDelete(): void {
        this.selectedGradeForDelete = null;
    }
}
