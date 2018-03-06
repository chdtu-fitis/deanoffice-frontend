export const defaultColumns = [
  'student.surname',
  'student.name',
  'student.patronimic',
  'student.telephone',
  'student.birthDate',
  'studentGroup.name',
  'payment'
];

export const allColumns = defaultColumns.concat(
  'student.surnameEng',
  'student.nameEng',
  'student.patronimicEng',
  'student.sex',
  'student.registrationAddress',
  'student.actualAddress',
  'recordBookNumber'
);
