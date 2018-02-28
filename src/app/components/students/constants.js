export const defaultColumns = [
  'student.name',
  'student.surname',
  'student.patronimic',
  'student.telephone',
  'student.birthDate',
  'studentGroup.name',
  'payment'
];

export const allColumns = defaultColumns.concat(
  'student.nameEng',
  'student.surnameEng',
  'student.patronimicEng',
  'student.sex',
  'student.registrationAddress',
  'student.actualAddress',
  'recordBookNumber'
);
