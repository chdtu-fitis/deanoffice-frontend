import {TuitionForm} from '../../models/tuition-form.enum';
import {TuitionTerm} from '../../models/tuition-term.enum';

export const COLUMN_DEFINITIONS = [
  {
    headerName: 'Назва',
    field: 'name',
    checkboxSelection: true,
    minWidth: 150,
  },
  {
    headerName: 'Освітня програма (спеціалізація)',
    field: 'specialization.name',
    cellStyle: { 'white-space': 'normal' },
    minWidth: 200
  },
  {
    headerName: 'Спеціальність',
    valueGetter: params => `${params.data.specialization.speciality.code} ${params.data.specialization.speciality.name}`,
    cellStyle: { 'white-space': 'normal' },
    minWidth: 280
  },
  {
    headerName: 'Ступінь',
    field: 'specialization.degree.name',
    filter: false,
  },
  {
    headerName: 'Форма',
    valueGetter: params => TuitionForm[params.data.tuitionForm],
    filter: false,
  },
  {
    headerName: 'Термін',
    valueGetter: params => TuitionTerm[params.data.tuitionTerm],
    filter: false,
  },
  {
    headerName: 'Створено',
    field: 'creationYear',
  },
  {
    headerName: 'Курс початку',
    field: 'beginYears',
    filter: false,
  },
  {
    headerName: 'Років навчання',
    field: 'studyYears',
  },
  {
    headerName: 'Семестрів',
    field: 'studySemesters',
    filter: false,
  }
];
