import {AcademicTitle} from "../../models/academic-title.enum";

export const COLUMN_DEFINITIONS = [
  {
    headerName: 'Прізвище',
    field: 'surname',
    checkboxSelection: true,
    minWidth: 130,
  },
  {
    headerName: 'І’мя',
    field: 'name',
    minWidth: 130,
  },
  {
    headerName: 'По батькові',
    field: 'patronimic',
    minWidth: 130,
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
    minWidth: 450,
  },
  {
    headerName: 'Науковий ступінь',
    field: 'scientificDegree.name',
    minWidth: 240,
  },
  {
    headerName: 'Вчене звання',
    field: 'academicTitle',
    valueGetter: (params) => params.data.academicTitle ? `${AcademicTitle[params.data.academicTitle]}` : '',
    minWidth: 90,
  },
  {
    headerName: 'Посада',
    field: 'position.name',
    minWidth: 90,
  }
];
