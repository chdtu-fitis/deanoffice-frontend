
export const COLUMN_DEFINITIONS_SELECTIVE_COURSE = [
  {
    headerName: 'Назва',
    field: 'course.courseName.name',
    checkboxSelection: true,
    minWidth: 150,
  },
  {
    headerName: 'Семестр',
    field: 'course.semester',
    cellStyle: { 'white-space': 'normal' },
    minWidth: 150
  }
];
