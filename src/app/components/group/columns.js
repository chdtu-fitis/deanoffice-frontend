export const columns = [
  {
    field: '{{row.name}}',
    title: 'Назва',
    style: {flex: '0 0 100px'}
  },
  {
    field: '{{row.specialization.name}}',
    title: 'Спеціалізація',
    style: {flex: '1 0 200px'}
  },
  {
    field: '{{row.specialization.speciality.code}} {{row.specialization.speciality.name}}',
    title: 'Спеціальність',
    style: {flex: '1 0 220px'}
  },
  {
    field: '{{row.specialization.degree.name}}',
    title: 'Ступінь',
    style: {flex: '0 0 100px'}
  },
  {
    field: '{{row.tuitionForm}}',
    title: 'Форма',
    style: {flex: '0 0 115px'}
  },
  {
    field: '{{row.tuitionTerm}}',
    title: 'Термін',
    style: {flex: '0 0 100px'}
  },
  {
    field: '{{row.creationYear}}',
    title: 'Створено',
    style: {flex: '0 0 105px'}
  },
  {
    field: '{{row.beginYears}}',
    title: 'Курс початку',
    style: {flex: '0 0 95px'}
  },
  {
    field: '{{row.studyYears}}',
    title: 'Років навчання',
    style: {flex: '0 0 106px'}
  },
  {
    field: '{{row.studySemesters}}',
    title: 'Семестрів',
    style: {flex: '0 0 110px'}
  },
];
