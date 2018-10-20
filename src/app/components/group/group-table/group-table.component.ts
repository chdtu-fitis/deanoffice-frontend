import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Input() loading: boolean;
  @Output() handleSelectedChange: EventEmitter<any> = new EventEmitter();

  sortingToTheTop: string = SORTING_TO_THE_TOP;
  sortingToTheBottom: string = SORTING_TO_THE_BOTTOM;
  translations = translations;
  sortInfo = [
    {field: null, direction: null},
    {field: null, direction: null}
  ];

  /**
   * handle click on th in the table
   */
  handleClickHeader(field): void {
    this.updateSortInfo(field);
    this.updateTable();
  }

  /**
   * change state of sortInfo property by the clicked field
   */
  updateSortInfo(field) {
    // if first element empty
    if (!this.sortInfo[0].field) {
      // set 'field' as first element
      this.sortInfo[0].field = field;
      this.sortInfo[0].direction = SORTING_TO_THE_TOP;
      return;
    }

    // if first element equals 'field'
    if (this.sortInfo[0].field === field) {
      // if direction equals 'top' change direction
      if (this.sortInfo[0].direction === SORTING_TO_THE_TOP) {
        this.sortInfo[0].direction = SORTING_TO_THE_BOTTOM;
        return;
      }
      // if direction equals 'bottom'
      if (this.sortInfo[0].direction === SORTING_TO_THE_BOTTOM) {
        // if exist second element set it as first element
        if (this.sortInfo[1].field) {
          this.sortInfo[0].field = this.sortInfo[1].field;
          this.sortInfo[0].direction = this.sortInfo[1].direction;
          this.sortInfo[1].field = null;
          this.sortInfo[1].direction = null;
          return;
        }
        // else delete first element
        this.sortInfo[0].field = null;
        this.sortInfo[0].direction = null;
        return;
      }
    }

    // if second element empty
    if (!this.sortInfo[1].field) {
      // set 'field' as second element
      this.sortInfo[1].field = field;
      this.sortInfo[1].direction = SORTING_TO_THE_TOP;
      return;
    }

    // if second element equals 'field'
    if (this.sortInfo[1].field === field) {
      // if direction equals 'top' change direction
      if (this.sortInfo[1].direction === SORTING_TO_THE_TOP) {
        this.sortInfo[1].direction = SORTING_TO_THE_BOTTOM;
        return;
      }
      // if direction equals 'bottom'
      if (this.sortInfo[1].direction === SORTING_TO_THE_BOTTOM) {
        // delete first element
        this.sortInfo[1].field = null;
        this.sortInfo[1].direction = null;
        return;
      }
    }

    // if sortInfo full replace second element by field
    this.sortInfo[1].field = field;
    this.sortInfo[1].direction = SORTING_TO_THE_TOP;
  }

  /**
   * update group table
   */
  updateTable(rows = this.rows): void {
    this.rows = this.multipleSort(rows);
  }

  /**
   * multiple sort the array by sortInfo
   */
  multipleSort(rows): StudentGroup[] {

    if (!this.sortInfo[0].field) {
      return rows;
    }

    const properties = [];

    // parse sortInfo field to the array structure
    for (let j = 0; j < this.sortInfo.length; j++) {
      if (this.sortInfo[j]['field']) {
        properties[j] = this.sortInfo[j]['field'].split(' ');
        for (let i = 0; i < properties[j].length; i++) {
          properties[j][i] = properties[j][i].split('.');
        }
      }
    }

    // sort the array
    rows = rows.sort((first, second) => {
      const firstValues = [];
      const secondValues = [];

      // get value by 'properties' info from elements
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

      // comparison of elements
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

  /**
   * add arrows if sortInfo has value
   */
  isActiveDirectionOfSorting(field, direction): boolean {
    for (let i = 0; i < this.sortInfo.length; i++) {
      if (this.sortInfo[i].field === field && this.sortInfo[i].direction === direction) {
        return true;
      }
    }
    return false;
  }

}
