import {Course} from '../../../models/Course';

export const COLUMN_DEFINITIONS: [{
  headerName: string;
  field?: string;
  checkboxSelection?: boolean;
  minWidth?: number;
  maxWidth?: number;
  width?: number;
  valueGetter?: (params: {data: Course, node, column, colDef, api, columnApi, getValue: () => any}) => string | void;
}] = [
  {
    headerName: '#',
    checkboxSelection: true,
    maxWidth: 40,
  },
  {
    headerName: 'ID',
    field: 'id',
    maxWidth: 80,
  },
  {
    headerName: 'Назва',
    field: 'name',
  },
  {
    headerName: 'Назва англ.',
    field: 'nameEng',
    maxWidth: 120,
  },
  {
    headerName: 'Аббревіатура',
    field: 'abbr',
    maxWidth: 160,
  },
];
