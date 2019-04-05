import {TuitionForm} from '../../models/tuition-form.enum';
import {TuitionTerm} from '../../models/tuition-term.enum';

export const COLUMN_DEFINITIONS_DEPARTMENT = [
  {
    headerName: 'Назва',
    field: 'name',
    checkboxSelection: true,
    minWidth: 150,
  },
  {
    headerName: 'Абревіатура',
    field: 'abbr',
    cellStyle: { 'white-space': 'normal' },
    minWidth: 200
  }
];
