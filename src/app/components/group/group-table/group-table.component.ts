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

    // sort the array
    rows = rows.sort((first, second) => {
      const firstValues = [];
      const secondValues = [];

      // get value from elements
      for (let i = 0; i < this.sortInfo.length; i++) {
        if (this.sortInfo[i]['field']) {
          firstValues.push(this.getValue(first, this.sortInfo[i]['field']));
          secondValues.push(this.getValue(second, this.sortInfo[i]['field']));
        }
      }

      // comparison of elements
      for (let i = 0; i < firstValues.length; i++) {
        if (this.sortInfo[i].direction === SORTING_TO_THE_TOP) {
          if (firstValues[i] < secondValues[i]) {
            return -1;
          }
          if (firstValues[i] > secondValues[i]) {
            return 1;
          }
        } else if (this.sortInfo[i].direction === SORTING_TO_THE_BOTTOM) {
          if (firstValues[i] < secondValues[i]) {
            return 1;
          }
          if (firstValues[i] > secondValues[i]) {
            return -1;
          }
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

  getValue(row, field) {

    let result = field;

    // function for get array of substrings from string
    const getFromBetween = function (string, sub1, sub2) {
      const results = [];
      const array = string.split(sub1);
      for (let i = 1; i < array.length; i++) {
        results.push(array[i].split(sub2)[0]);
      }
      return results;
    };

    // function for get property from item by array of key
    const getProperty = function (item, key, depth) {
      if (!key[depth]) {
        return item;
      }
      return getProperty(item[key[depth]], key, depth + 1)
    };

    // get array of substrings from string
    const keys = getFromBetween(result, '{{', '}}');

    // replace all substrings by value of property
    for (let i = 0; i < keys.length; i++) {
      result = result.replace(
        `{{${keys[i]}}}`,
        getProperty(row, keys[i].split('.'), 1)
      );
    }

    return result;
  }

}
