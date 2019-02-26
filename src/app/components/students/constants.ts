import {Payment} from '../../models/payment.enum';
import {Gender} from '../../models/gender.enum';
import {Utils} from '../shared/utils';

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

// for ag-grid
export const LOCALE_TEXT = {
  // for text filter
  equals: 'Рівне',
  notEqual: 'Не рівне',
  contains: 'Містить',
  notContains: 'Не містить',
  startsWith: 'Починається з',
  endsWith: 'Кінчається з',
  // for number filter
  lessThan: 'Меньше',
  greaterThan: 'Більше',
  inRange: 'В діапазоні',

  noRowsToShow: 'Завантаження данних',
};

export const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
};

const dateFields = {
  filter: 'agDateColumnFilter',
  filterParams: {
    comparator: (filterDate, cellValue) => Utils.dateComparator(filterDate, cellValue),
    browserDatePicker: true
  },
  cellRenderer: data => Utils.formatDate(data.value)
};

const colDefStudentSurname = {
  headerName: 'Прізвище',
  field: 'student.surname',
  checkboxSelection: true,
  minWidth: 150
};

const colDefStudentName = {
  headerName: 'Ім\'я',
  field: 'student.name',
  minWidth: 150
};

const colDefStudentPatronimic = {
  headerName: 'По-батькові',
  field: 'student.patronimic',
  minWidth: 150
};

const colDefStudentTelephone = {
  headerName: 'Телефон',
  field: 'student.telephone',
  sortable: false,
  minWidth: 125,
  maxWidth: 150,
};

const colDefStudentGroupName = {
  headerName: 'Група',
  field: 'studentGroup.name',
  filter: 'groupFilter',
  minWidth: 100
};

const colDefPayment = {
  headerName: 'Форма навчання',
  field: 'payment',
  valueGetter: params => Payment[params.data.payment],
  filter: 'paymentFilter',
  minWidth: 100
};

const colDefStudentBirthDate = {
  headerName: 'Дата народження',
  field: 'student.birthDate',
  ...dateFields,
  minWidth: 100
};

const colDefStudentSurnameEng = {
  headerName: 'Прізвище (англ.)',
  field: 'student.surnameEng',
  minWidth: 100
};

const colDefStudentNameEng = {
  headerName: 'Ім\'я (англ.)',
  field: 'student.nameEng',
  minWidth: 100
};

const colDefStudentSex = {
  headerName: 'Стать',
  field: 'student.sex',
  valueGetter: (params) => Gender[params.data.student.sex],
  minWidth: 50
};

const colDefStudentRegistrationAddress = {
  headerName: 'Адреса реєстрації',
  field: 'student.registrationAddress',
  minWidth: 100
};

const colDefStudentActualAddress = {
  headerName: 'Поточна адреса',
  field: 'student.actualAddress',
  minWidth: 100
};

const colDefStudentRecordBookNumber = {
  headerName: 'Номер заліковки',
  field: 'recordBookNumber',
  minWidth: 100
};

const colDefThesisName = {
  headerName: 'Тема диплому',
  field: 'thesisName',
  minWidth: 100
};

const colDefThesisNameEng = {
  headerName: 'Тема диплому (англ.)',
  field: 'thesisNameEng',
  minWidth: 100
};

const colDefDiplomaNumber = {
  headerName: 'Номер диплому',
  field: 'diplomaNumber',
  minWidth: 100
};

const colDefDiplomaDate = {
  headerName: 'Дата диплому',
  field: 'diplomaDate',
  minWidth: 100,
  ...dateFields
};

const colDefSupplementNumber = {
  headerName: 'Номер додатку до диплому',
  field: 'supplementNumber',
  minWidth: 100
};

const colDefSupplementDate = {
  headerName: 'Дата додатку до диплому',
  field: 'supplementDate',
  minWidth: 100,
  ...dateFields
};

const colDefPreviousDiplomaNumber = {
  headerName: 'Номер попереднього диплому',
  field: 'previousDiplomaNumber',
  minWidth: 100
};

const colDefPreviousDiplomaDate = {
  headerName: 'Дата попереднього диплому',
  field: 'previousDiplomaDate',
  minWidth: 100,
  ...dateFields
};

const colDefProtocolNumber = {
  headerName: 'Номер протоколу захисту диплому',
  field: 'protocolNumber',
  minWidth: 100
};

const colDefProtocolDate = {
  headerName: 'Дата протоколу захисту диплому',
  field: 'protocolDate',
  minWidth: 100,
  ...dateFields
};

export const defaultColumnDefs = [
  colDefStudentSurname,
  colDefStudentName,
  colDefStudentPatronimic,
  colDefStudentTelephone,
  colDefStudentGroupName,
  colDefPayment
];


const expelledStudentSurname = {
  headerName: 'Прізвище',
  field: 'studentDegree.student.surname',
  checkboxSelection: true,
  minWidth: 150
};

const expelledStudentName = {
  headerName: 'Ім\'я',
  field: 'studentDegree.student.name',
  minWidth: 150
};

const expelledStudentPatronimic = {
  headerName: 'По-батькові',
  field: 'studentDegree.student.patronimic',
  minWidth: 150
};

const applicationDate = {
  headerName: 'Дата заяви',
  field: 'applicationDate',
  ...dateFields
};

const expelDate = {
  headerName: 'Дата відрахування',
  field: 'expelDate',
  ...dateFields
};

const orderDate = {
  headerName: 'Дата наказу',
  field: 'orderDate',
  ...dateFields
};

const orderReasonName = {
  headerName: 'Причина',
  field: 'orderReason.name'
};

export const expelledColumnDefs = [
  expelledStudentSurname,
  expelledStudentName,
  expelledStudentPatronimic,
  applicationDate,
  expelDate,
  orderDate,
  orderReasonName
];

const vacationStartDate = {
  headerName: 'Дата початку',
  field: 'vacationStartDate',
  ...dateFields
};

const vacationEndDate = {
  headerName: 'Дата закінчення',
  field: 'vacationEndDate',
  ...dateFields
};


export const academicVacationColumnDefs = [
  expelledStudentSurname,
  expelledStudentName,
  expelledStudentPatronimic,
  vacationStartDate,
  vacationEndDate,
  applicationDate,
  orderDate,
  orderReasonName
];

export const allColumnDefs = [
  ...defaultColumnDefs,
  colDefStudentBirthDate,
  colDefStudentSurnameEng,
  colDefStudentNameEng,
  colDefStudentSex,
  colDefStudentRegistrationAddress,
  colDefStudentActualAddress,
  colDefStudentRecordBookNumber,
  colDefThesisName,
  colDefThesisNameEng,
  colDefDiplomaNumber,
  colDefDiplomaDate,
  colDefSupplementNumber,
  colDefSupplementDate,
  colDefPreviousDiplomaNumber,
  colDefPreviousDiplomaDate,
  colDefProtocolNumber,
  colDefProtocolDate
];
