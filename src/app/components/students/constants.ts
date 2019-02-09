import {Payment} from '../../models/payment.enum';
import {Gender} from '../../models/gender.enum';

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

// for ag-grid
export const localeText = {
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


const colDefStudentSurname = {
  headerName: 'Прізвище',
  field: 'student.surname',
  sortable: true,
  filter: true,
  checkboxSelection: true,
  resizable: true,
  minWidth: 150
};

const colDefStudentName = {
  headerName: 'Ім\'я',
  field: 'student.name',
  filter: true,
  sortable: true,
  resizable: true,
  minWidth: 150
};

const colDefStudentPatronimic = {
  headerName: 'По-батькові',
  field: 'student.patronimic',
  sortable: true,
  resizable: true,
  minWidth: 150
};

const colDefStudentTelephone = {
  headerName: 'Телефон',
  field: 'student.telephone',
  resizable: true,
  filter: true,
  minWidth: 125,
  maxWidth: 150,
};

const colDefStudentGroupName = {
  headerName: 'Група',
  field: 'studentGroup.name',
  sortable: true,
  filter: 'groupFilter',
  minWidth: 100
};

const colDefPayment = {
  headerName: 'Форма навчання',
  field: 'payment',
  valueGetter: (params) => Payment[params.data.payment],
  sortable: true,
  filter: 'paymentFilter',
  minWidth: 100
};

const colDefStudentBirthDate = {
  headerName: 'Дата народження',
  field: 'student.birthDate',
  sortable: true,
  filter: 'agDateColumnFilter',
  filterParams: {
    comparator: function(filterDate, cellValue) {
      const dateAsString = cellValue;
      if (dateAsString == null) { return -1; }
      const dateParts = dateAsString.split('-');
      const cellDate = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
      if (filterDate.getTime() === cellDate.getTime()) {
        return 0;
      }
      if (cellDate < filterDate) {
        return -1;
      }
      if (cellDate > filterDate) {
        return 1;
      }
    },
    browserDatePicker: true
  },
  minWidth: 100
};

const colDefStudentSurnameEng = {
  headerName: 'Прізвище (англ.)',
  field: 'student.surnameEng',
  sortable: true,
  filter: true,
  minWidth: 100
};

const colDefStudentNameEng = {
  headerName: 'Ім\'я (англ.)',
  field: 'student.nameEng',
  sortable: true,
  filter: true,
  minWidth: 100
};

const colDefStudentSex = {
  headerName: 'Стать',
  field: 'student.sex',
  valueGetter: (params) => Gender[params.data.student.sex],
  sortable: true,
  minWidth: 50
};

const colDefStudentRegistrationAddress = {
  headerName: 'Адреса реєстрації',
  field: 'student.registrationAddress',
  sortable: true,
  minWidth: 100
};

const colDefStudentActualAddress = {
  headerName: 'Поточна адреса',
  field: 'student.actualAddress',
  sortable: true,
  minWidth: 100
};

const colDefStudentRecordBookNumber = {
  headerName: 'Номер заліковки',
  field: 'recordBookNumber',
  sortable: true,
  minWidth: 100
};

const colDefThesisName = {
  headerName: 'Тема диплому',
  field: 'thesisName',
  sortable: true,
  minWidth: 100
};

const colDefThesisNameEng = {
  headerName: 'Тема диплому (англ.)',
  field: 'thesisNameEng',
  sortable: true,
  minWidth: 100
};

const colDefDiplomaNumber = {
  headerName: 'Номер диплому',
  field: 'diplomaNumber',
  sortable: true,
  minWidth: 100
};

const colDefDiplomaDate = {
  headerName: 'Дата диплому',
  field: 'diplomaDate',
  sortable: true,
  minWidth: 100
};

const colDefSupplementNumber = {
  headerName: 'Номер додатку до диплому',
  field: 'supplementNumber',
  sortable: true,
  minWidth: 100
};

const colDefSupplementDate = {
  headerName: 'Дата додатку до диплому',
  field: 'supplementDate',
  sortable: true,
  minWidth: 100
};

const colDefPreviousDiplomaNumber = {
  headerName: 'Номер попереднього диплому',
  field: 'previousDiplomaNumber',
  sortable: true,
  minWidth: 100
};

const colDefPreviousDiplomaDate = {
  headerName: 'Дата попереднього диплому',
  field: 'previousDiplomaDate',
  sortable: true,
  minWidth: 100
};

const colDefProtocolNumber = {
  headerName: 'Номер протоколу захисту диплому',
  field: 'protocolNumber',
  sortable: true,
  minWidth: 100
};

const colDefProtocolDate = {
  headerName: 'Дата протоколу захисту диплому',
  field: 'protocolDate',
  sortable: true,
  minWidth: 100
};

export const defaultColumnDefs = [colDefStudentSurname, colDefStudentName, colDefStudentPatronimic,
  colDefStudentTelephone, colDefStudentGroupName, colDefPayment];

export const allColumnDefs = [...defaultColumnDefs, colDefStudentBirthDate,
  colDefStudentSurnameEng, colDefStudentNameEng, colDefStudentSex,
  colDefStudentRegistrationAddress, colDefStudentActualAddress, colDefStudentRecordBookNumber,
  colDefThesisName, colDefThesisNameEng, colDefDiplomaNumber, colDefDiplomaDate,
  colDefSupplementNumber, colDefSupplementDate, colDefPreviousDiplomaNumber,
  colDefPreviousDiplomaDate, colDefProtocolNumber, colDefProtocolDate];
