export const COLUMN_DEFINITIONS = [
  {
    headerName: 'Назва',
    field: 'name',
    sortable: true ,
    filter: true,
    checkboxSelection: true,
    resizable: true
  },
  {
    headerName: 'Назва англійською',
    field: 'nameEng',
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    headerName: 'Спеціальність',
    sortable: true,
    valueGetter: function(params) { return `${params.data.speciality.code} ${params.data.speciality.name}`; },
    filter: true,
    minWidth: 450,
    resizable: true
  },
  {
    headerName: 'Ступінь',
    field: 'degree.name',
    sortable: true,
    resizable: true,
  },
  {
    headerName: 'Гарант програми',
    field: 'educationalProgramHeadName',
    filter: true,
    sortable: true
  }
];







