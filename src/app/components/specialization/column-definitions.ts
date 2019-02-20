export const COLUMN_DEFINITIONS = [
  {
    headerName: 'Назва',
    field: 'name',
    checkboxSelection: true,
  },
  {
    headerName: 'Назва англійською',
    field: 'nameEng',
  },
  {
    headerName: 'Спеціальність',
    valueGetter: function(params) { return `${params.data.speciality.code} ${params.data.speciality.name}`; },
    minWidth: 450,
  },
  {
    headerName: 'Ступінь',
    field: 'degree.name',
    filter: false
  },
  {
    headerName: 'Гарант програми',
    field: 'educationalProgramHeadName',
  }
];
