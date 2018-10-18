import {Component, Input} from '@angular/core';
import {StudentGroup} from '../../../models/StudentGroup';
import {translations} from '../translations.js'

const SORTING_TO_THE_TOP = '1';
const SORTING_TO_THE_BOTTOM = '2';

@Component({
  selector: 'group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.scss']
})
export class GroupTableComponent {
  @Input('rows') rows: StudentGroup[];
  @Input() searchText: string;

  @Input() loading: boolean;

  sortingToTheTop: string;
  sortingToTheBottom: string;
  translations = [];

  sortInfo = [
    {field: null, direction: null},
    {field: null, direction: null}
  ];

  constructor() {
    this.sortingToTheTop = SORTING_TO_THE_TOP;
    this.sortingToTheBottom = SORTING_TO_THE_BOTTOM;
    this.translations = translations;
  }

  handleClickHeader(field): void {
    this.checkSortInfo(field);
    if (this.sortInfo[0].field) {
      this.rows = this.multipleSort(this.rows);
    }
  }

  checkSortInfo(field) {
    if (!this.sortInfo[0].field) {
      this.sortInfo[0].field = field;
      this.sortInfo[0].direction = SORTING_TO_THE_TOP;
      return;
    }

    if (this.sortInfo[0].field === field) {
      if (this.sortInfo[0].direction === SORTING_TO_THE_TOP) {
        this.sortInfo[0].direction = SORTING_TO_THE_BOTTOM;
        return;
      }
      if (this.sortInfo[0].direction === SORTING_TO_THE_BOTTOM) {
        if (this.sortInfo[1].field) {
          this.sortInfo[0].field = this.sortInfo[1].field;
          this.sortInfo[0].direction = this.sortInfo[1].direction;
          this.sortInfo[1].field = null;
          this.sortInfo[1].direction = null;
          return;
        }
        this.sortInfo[0].field = null;
        this.sortInfo[0].direction = null;
        return;
      }
    }

    if (!this.sortInfo[1].field) {
      this.sortInfo[1].field = field;
      this.sortInfo[1].direction = SORTING_TO_THE_TOP;
      return;
    }

    if (this.sortInfo[1].field === field) {
      if (this.sortInfo[1].direction === SORTING_TO_THE_TOP) {
        this.sortInfo[1].direction = SORTING_TO_THE_BOTTOM;
        return;
      }
      if (this.sortInfo[1].direction === SORTING_TO_THE_BOTTOM) {
        this.sortInfo[1].field = null;
        this.sortInfo[1].direction = null;
        return;
      }
    }

    this.sortInfo[1].field = field;
    this.sortInfo[1].direction = SORTING_TO_THE_TOP;
  }

  multipleSort(rows): StudentGroup[] {
    const properties = [];
    for (let j = 0; j < this.sortInfo.length; j++) {
      if (this.sortInfo[j]['field']) {
        properties[j] = this.sortInfo[j]['field'].split(' ');
        for (let i = 0; i < properties[j].length; i++) {
          properties[j][i] = properties[j][i].split('.');
        }
      }
    }

    rows = rows.sort((first, second) => {
      const firstValues = [];
      const secondValues = [];

      for (let g = 0; g < properties.length; g++) {
        firstValues[g] = '';
        secondValues[g] = '';
        for (let j = 0; j < properties[g].length; j++) {
          let firstDump = first;
          let secondDump = second;
          for (let i = 0; i < properties[g][j].length; i++) {
            firstDump = firstDump[properties[g][j][i]];
            secondDump = secondDump[properties[g][j][i]];
          }
          firstValues[g] += ' ' + firstDump;
          secondValues[g] += ' ' + secondDump;
        }
      }

      for (let i = 0; i < firstValues.length; i++) {
        if (this.sortInfo[i].direction === SORTING_TO_THE_TOP) {
          if (firstValues[i] < secondValues[i]) { return -1; }
          if (firstValues[i] > secondValues[i]) { return 1; }
        } else if (this.sortInfo[i].direction === SORTING_TO_THE_BOTTOM) {
          if (firstValues[i] < secondValues[i]) { return 1; }
          if (firstValues[i] > secondValues[i]) { return -1; }
        }
      }
    });

    return rows;
  }

  isActiveDirectionOfSorting(field, direction): boolean {
    for (let i = 0; i < this.sortInfo.length; i++) {
      if (this.sortInfo[i].field === field && this.sortInfo[i].direction === direction) {
        return true;
      }
    }
    return false;
  }

}
