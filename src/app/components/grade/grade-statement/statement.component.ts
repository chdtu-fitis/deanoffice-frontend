import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {IAppModal} from '../../shared/modal.interface';
import {Grade} from '../../../models/Grade';

@Component({
    selector: 'app-grades-statement',
    templateUrl: './statement.component.html',
    styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit, IAppModal {
    @ViewChild('modal') modal: ModalDirective;
    @Input() studentsDegree: any = [];
    @Input() courses = [];
    selectedCourseId = 0;
    updateGrades = [];
    @Output() sendGrades = new EventEmitter();
    @Output() resetGradesForTable = new EventEmitter();
    error = '';

    ngOnInit() {
    }

    setError(error: string): void {
        this.error = error;
    }

    setCourse(courseId: number) {
        this.selectedCourseId = courseId;
    }

    resetGrades() {
        this.updateGrades = [];
        this.resetGradesForTable.emit();
    };

    closeModal() {
        this.resetGrades();
        this.modal.hide();
    }

    sendUpdateGrades() {
        this.sendGrades.emit(this.updateGrades);
        this.resetGrades();
    }

    setUpdateGrade(grade: Grade): void {
        const gradeId = this.findGrade(this.updateGrades, grade);
        if (gradeId === -1) {
            this.updateGrades.push(grade);
        } else {
            this.updateGrades[gradeId] = grade;
        }
    }

    findGrade(grades: Grade[], grade: Grade): number {
        if (!this.updateGrades.length || (!grade.course.id && !grade.studentDegree.id)) return -1;
        for (let q = 0; q < this.updateGrades.length; q++) {
            if (this.updateGrades[q].course.id === grade.course.id &&
                this.updateGrades[q].studentDegree.id === grade.studentDegree.id) return q;
        }
        return -1;
    }
}