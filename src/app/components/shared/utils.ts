export class Utils {
  static dateComparator(filterDate, cellValue) {
    const dateAsString = cellValue;
    if (dateAsString == null) { return -1; }
    const dateParts = dateAsString.split('-');
    const cellDate = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
    if (filterDate.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterDate) {
      return -1;
    }
    if (cellDate > filterDate) {
      return 1;
    }
  }
}
