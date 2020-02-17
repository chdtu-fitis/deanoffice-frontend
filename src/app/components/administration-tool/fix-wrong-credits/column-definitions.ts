export const COLUMN_DEFINITIONS: any[] = [
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
    field: 'courseName.name',
  },
  {
    headerName: 'Семестр',
    field: 'semester',
    maxWidth: 120,
    valueGetter: params => (params.data.semester + 1).toString(),
  },
  {
    headerName: 'Тип контролю',
    field: 'knowledgeControl.name',
    maxWidth: 160,
  },
  {
    headerName: 'Годин',
    field: 'hours',
    maxWidth: 120,
  },
  {
    headerName: 'Год/кредити',
    field: 'hoursPerCredit',
    maxWidth: 160,
  },
  {
    headerName: 'Кредитів',
    field: 'credits',
    valueGetter: params => {
      const credits = params.data.hours / params.data.hoursPerCredit;
      const newCreditsValue = credits ? credits.toFixed(2) : credits;
      return `${params.data.credits} -> ${newCreditsValue}`;
    },
    maxWidth: 120,
  }
];
