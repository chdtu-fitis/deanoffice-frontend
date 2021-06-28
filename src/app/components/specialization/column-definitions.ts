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
    valueGetter: params => `${params.data.speciality.code} ${params.data.speciality.name}`,
    minWidth: 450,
  },
  {
    headerName: 'Ступінь',
    field: 'degree.name',
    filter: false,
    maxWidth: 100,
  },
  {
    headerName: 'Гарант програми',
    valueGetter: params => params.data.programHead && `${params.data.programHead.surname} ${params.data.programHead.name}`
  }
];
