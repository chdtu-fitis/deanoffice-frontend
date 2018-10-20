import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StudentGroup} from '../../../models/StudentGroup';
import {translations} from '../translations.js'

const SORTING_TO_THE_TOP = '1';
const SORTING_TO_THE_BOTTOM = '2';

const MAXIMUM_NUMBER_OF_COLUMNS_FOR_SORTING = 3;

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
  updateSortInfo(field): void {
    for (let i = 0; i < MAXIMUM_NUMBER_OF_COLUMNS_FOR_SORTING; i++) {
      // if 'i' element empty
      if (!this.sortInfo[i].field) {
        // set 'field' as 'i' element
        this.sortInfo[i].field = field;
        this.sortInfo[i].direction = SORTING_TO_THE_TOP;
        return;
      }
      // if 'i' element equals 'field'
      if (this.sortInfo[i].field === field) {
        // if direction equals 'top' change direction
        if (this.sortInfo[i].direction === SORTING_TO_THE_TOP) {
          this.sortInfo[i].direction = SORTING_TO_THE_BOTTOM;
          return;
        }
        // if direction equals 'bottom'
        if (this.sortInfo[i].direction === SORTING_TO_THE_BOTTOM) {
          // delete 'i'
          this.sortInfo.splice(i, 1);
          this.sortInfo.push({field: null, direction: null});
          return;
        }
      }
    }
    // if all full and another element selected set as last element
    this.sortInfo[MAXIMUM_NUMBER_OF_COLUMNS_FOR_SORTING - 1].field = field;
    this.sortInfo[MAXIMUM_NUMBER_OF_COLUMNS_FOR_SORTING - 1].direction = SORTING_TO_THE_TOP;
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
