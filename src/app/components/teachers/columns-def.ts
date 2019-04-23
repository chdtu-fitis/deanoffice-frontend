export const COLUMN_DEFINITIONS = [
  {
    headerName: 'Прізвище',
    field: 'surname',
    checkboxSelection: true,
    minWidth: 150,
  },
  {
    headerName: 'Імя',
    field: 'name',
    minWidth: 150,
  },
  {
    headerName: 'По батькові',
    field: 'patronimic',
    minWidth: 150,
  },
  // {
  //   headerName: 'Стать',
  //   field: 'sex',
  //   valueGetter: (params) => `${Gender[params.data.sex].toLowerCase().slice(0, 3)}.`,
  //   minWidth: 150,
  // },
  {
    headerName: 'Кафедра',
    field: 'department.name',
    minWidth: 500,
  },
  {
    headerName: 'Науковий Ступінь',
    field: 'scientificDegree',
    minWidth: 150,
  },
  {
    headerName: 'Посада',
    field: 'position.name',
    minWidth: 150,
  }
];
