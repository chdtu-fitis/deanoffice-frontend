import {Component, EventEmitter, Input, Output} from '@angular/core';

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

    constructor() {}

    editGrade(grade, id) {
        if(grade.points > 100 || grade.points < 0) {
            this.errors.emit('Помилка, оцiнка повинна бути бiльша 0 та менша або рiвна 100!');
            this.updateVisible(id, 'bg-danger');
            return;
        }

        this.errors.emit(false);
        const gradeId = this.findGradeOfGrades(grade);
        if (gradeId >= 0) {
            this.grades[gradeId] = grade;
        } else {
            this.grades.push(grade);
        }
        this.gradesUpdate.emit(this.grades);
        this.updateVisible(id, 'bg-warning');
    }

    updateVisible(id, style) {
        const element = document.getElementById(id);
        const styles = 'text-center align-middle';
        element.setAttribute('class', `${styles} ${style}`);
    }

    findGradeOfGrades(grade) {
        if (!this.grades.length) return -1;
        for (let i = 0; i < this.grades.length; i++) {
            if (this.grades[i].id === grade.id) {
                return i;
            }
        }
        return -1;
    }

}
