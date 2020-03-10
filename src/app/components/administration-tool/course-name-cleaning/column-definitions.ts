import {Course} from '../../../models/Course';

export const COLUMN_DEFINITIONS = [
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
    maxWidth: 250,
  },
  {
    headerName: 'Аббревіатура',
    field: 'abbreviation',
    maxWidth: 200,
  },
];
