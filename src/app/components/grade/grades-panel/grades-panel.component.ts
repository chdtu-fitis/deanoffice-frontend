import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StudentGroup} from '../../../models/StudentGroup';
import {Utils} from '../../shared/utils';

@Component({
  selector: 'app-grades-panel',
  templateUrl: './grades-panel.component.html',
  styleUrls: ['./grades-panel.component.scss']
})
export class GradesPanelComponent implements OnInit {
  @Input() groups;
  @Input() selectiveGroups;
  @Output() changeGroup = new EventEmitter();
  @Output() changeGroupType = new EventEmitter();
  @Output() changeYear = new EventEmitter();
  @Output() changeDegree = new EventEmitter();
  @Output() changeSemester = new EventEmitter();
  @Output() sendRequestGetGrades = new EventEmitter();
  selectedYear: string;
  years = [
    {id: '2020', name: '2020-2021'},
    {id: '2021', name: '2021-2022'},
    {id: '2022', name: '2022-2023'}];
  autoSemesterSelect = true;
  fullTimeGroupsVisible: boolean = true;
  extramuralGroupsVisible: boolean = true;
  selectGroup = new StudentGroup();
  studySemesters = 12;
  selectSemester = 1;
  degree = 1;
  searchText: string;
  selectiveGroupsEnabled = false;

  ngOnInit() {
    this.selectedYear = Utils.getCurrentAcademicYear().toString();
  }

  onSelectedYearChange() {
    this.changeYear.emit(this.selectedYear);
  }

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

  checkAutoSelectSemester(e: any) {
    const currentSemester = this.getCurrentSemester(this.selectGroup.creationYear);
    if (this.selectGroup && this.selectSemester !== currentSemester && e.srcElement.checked) {
      this.setCurrentSemester();
      this.toggleSemester();
    }
  }

  onClickTuitionFormCheckBox(event) {
    if (!this.extramuralGroupsVisible && this.fullTimeGroupsVisible && event.target.attributes.id.nodeValue === 'fullTimeGroupsVisible') {
      this.extramuralGroupsVisible = true;
    }
    if (this.extramuralGroupsVisible && !this.fullTimeGroupsVisible && event.target.attributes.id.nodeValue === 'extramuralGroupsVisible') {
      this.fullTimeGroupsVisible = true;
    }
  }

  setCurrentSemester() {
    const currentSemester = this.getCurrentSemester(this.selectGroup.creationYear);
    if (currentSemester !== this.selectSemester) {
      this.selectSemester = currentSemester;
    }
  }

  getSelectGroup(group) {
    if (this.selectGroup.id !== group.id) {
      this.setGroups(group);
      this.setStudySemester(group.studySemesters);
      if (this.autoSemesterSelect) {
        this.selectSemester = this.getCurrentSemester(this.selectGroup.creationYear);
        this.setSelectedSemester();
      }
      this.changeGroup.emit({ group: group, isSelective: this.selectiveGroupsEnabled });
      this.getGrades();
    }
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
    const currentMonth = date.getMonth() + 1;

    let semester = 0;

    if ([1, 2, 3, 4,].includes(currentMonth)) {
      semester = -1;
    } else if ([11, 12].includes(currentMonth)) {
      semester = 1;
    }

    const currentSemester = (currentYear - year) * 2 + semester;

    return currentSemester === 0 ? 1 : currentSemester;
  }

  selectiveGroupsToggleChange() {
    if (this.selectiveGroupsEnabled) {
      this.autoSemesterSelect = false;
    }
    this.changeGroupType.emit(this.selectiveGroupsEnabled);
  }

  onDegreeChange() {
    this.changeDegree.emit(this.degree)
  }
}
