import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Grade} from '../../../../models/Grade';

@Component({
    selector: 'app-grade-statement-table',
    templateUrl: './grade-statement-table.component.html',
    styleUrls: ['./grade-statement-table.component.scss']
})
export class GradeStatementTableComponent implements OnInit {
    @Input() studentsDegree: any;
    @Input() courseId = 0;
    @Input() onTime: boolean;
    @Output() setGrade = new EventEmitter();
    @Output() error = new EventEmitter();

    ngOnInit() {
    }

    setUpdateGrades(grade: Grade): void {
        this.setGrade.emit(grade);
    }

    changeOnTime(studentId: number) {
        this.studentsDegree[studentId].grades[this.courseId].onTime = !this.studentsDegree[studentId].grades[this.courseId].onTime;
        this.setUpdateGrades(this.studentsDegree[studentId].grades[this.courseId]);
    }

    getElementId(studentId: number): string {
        return `grade${studentId}id`;
    }

    editGrade(studentId: number): void {
        const id = this.getElementId(studentId);
        const grade = this.studentsDegree[studentId].grades[this.courseId];
        if (grade.points > 100 || grade.points < 0 || !grade.points) {
            this.updateVisible(id, 'bg-danger');
            this.setError('Помилка, оцiнка повинна бути бiльша 0 та менша або рiвна 100!');
        } else {
            this.setError('');
            this.setUpdateGrades(grade);
            this.updateVisible(id, 'bg-warning');
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
