export const maxFileSize = 1572864;

export const defaultColumns = [
  'student.surname',
  'student.name',
  'student.patronimic',
  'student.telephone',
  'studentGroup.name',
  'payment'
];

export const allColumns = defaultColumns.concat(
  'student.birthDate',
  'student.surnameEng',
  'student.nameEng',
  'student.sex',
  'student.registrationAddress',
  'student.actualAddress',
  'recordBookNumber',
  'thesisName',
  'thesisNameEng',
  'diplomaNumber',
  'diplomaDate',
  'supplementNumber',
  'supplementDate',
  'previousDiplomaNumber',
  'previousDiplomaDate',
  'protocolNumber',
  'protocolDate'
);

export const expelledStudentsColumns = [
  'studentDegree.student.surname',
  'studentDegree.student.name',
  'studentDegree.student.patronimic',
  'applicationDate',
  'expelDate',
  'orderDate',
  'orderReason.name',
];

export const academicVacationColumns = [
  'studentDegree.student.surname',
  'studentDegree.student.name',
  'studentDegree.student.patronimic',
  'vacationStartDate',
  'vacationEndDate',
  'applicationDate',
  'orderDate',
  'orderReason.name',
];

export const months = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень'
];
