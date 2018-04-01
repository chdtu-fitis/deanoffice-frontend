import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'grades-panel',
    templateUrl: './grades-panel.component.html',
    styleUrls: ['./grades-panel.component.scss']
})
export class GradesPanelComponent {
    @Input() groups;
    @Output() setGroup = new EventEmitter();
    @Output() setSemester = new EventEmitter();
    autoSemesterSelect = true;
    selectGroup: any = [];
    studySemesters = 10;
    selectSemester = 1;

    getSelectGroup(group) {
        if (this.selectGroup === group) return;
        this.studySemesters = group.studySemesters;
        this.selectGroup = group;
        if (this.autoSemesterSelect) this.selectSemester = this.getCurrentSemester(this.selectGroup.creationYear);
        this.getSelectedSemester();
        this.setGroup.emit(group);
    }

    setCurrentSemester() {
        const currentSemester = this.getCurrentSemester(this.selectGroup.creationYear);
        if (currentSemester !== this.selectSemester) {
            this.selectSemester = currentSemester;
            this.getSelectedSemester();
        }
    }

    getSelectedSemester() {
        this.setSemester.emit(this.selectSemester);
    }

    getCurrentSemester(year: number): number {
        const date = new Date();
        const currentYear = date.getFullYear();
        const semester = date.getMonth() >= 8 ? 1 : 2;
        if (currentYear - year === 0) return semester;
        return (currentYear - year - 1) * 2 + semester;
    }
}
