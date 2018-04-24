import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'grades-panel',
    templateUrl: './grades-panel.component.html',
    styleUrls: ['./grades-panel.component.scss']
})
export class GradesPanelComponent {
    @Input() groups;
    @Output() changeGroup = new EventEmitter();
    @Output() changeSemester = new EventEmitter();
    @Output() sendRequestGetGrades = new EventEmitter();
    autoSemesterSelect = false;
    selectGroup: any = false;
    studySemesters = 10;
    selectSemester = 1;
    degree = 1;

    toggleSemester(): void {
        this.setSelectedSemester();
        this.getGrades();
    }

    setSelectedSemester(): void {
        this.changeSemester.emit(this.selectSemester);
    }

    getGrades(): void {
        this.sendRequestGetGrades.emit();
    }

    checkAutoSelectSemester() {
        if (this.selectGroup) {
            this.setCurrentSemester();
            this.toggleSemester();
        }
    }

    setCurrentSemester() {
        const currentSemester = this.getCurrentSemester(this.selectGroup.creationYear);
        if (currentSemester !== this.selectSemester) {
            this.selectSemester = currentSemester;
        }
    }

    getSelectGroup(group) {
        if (this.selectGroup.id === group.id) return;
        this.setGroups(group);
        this.setStudySemester(group.studySemesters);
        if (this.autoSemesterSelect) {
            this.selectSemester = this.getCurrentSemester(this.selectGroup.creationYear);
            this.setSelectedSemester();
        }
        this.changeGroup.emit(group);
        this.getGrades();
    }

    setStudySemester(studySemesters): void {
        this.studySemesters = studySemesters;
    }

    setGroups(group) {
        this.selectGroup = group;
    }

    getCurrentSemester(year: number): number {
        const date = new Date();
        const currentYear = date.getFullYear();
        const semester = date.getMonth() >= 8 ? 1 : 2;
        if (currentYear - year === 0) return semester;
        return (currentYear - year - 1) * 2 + semester;
    }
}