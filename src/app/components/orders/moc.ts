export const tableData = [
  {number: '15H0O-T',  type: 'Про переведення', date: new Date().toISOString(), status: 'Активний'},
  {number: '75PO-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Проект'},
  {number: '75EG-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Відхилений'},
  {number: '75ED-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Відхилений'},
  {number: '75Eh-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Відхилений'},
  {number: '75E4-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Відхилений'},
  {number: '75Ea-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Проект'},
  {number: '75Ej-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Відхилений'},
  {number: '75E3-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Активний'},
  {number: '75E0-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Відхилений'},
  {number: '75El-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Відхилений'},
  {number: '75Eb-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Проект'},
  {number: '75Eq-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Відхилений'},
  {number: '75E1-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Проект'},
  {number: '75E5-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Відхилений'},
  {number: '75E7-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Відхилений'},
  {number: '75E9-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Активний'},
];


export const orderTypes = [
  {name: 'Про переведення (зміна фінансування)', value: 'finance-transition'},
  {name: 'Про переведення', value: 'transition'},
  {name: 'Про поновлення', value: 'renewal'},
  {name: 'Про поновлення (з іншого ЗВО)', value: 'renewal-foreign'},
  {name: 'Про переведення (з іншого ЗВО)', value: 'transition-foreign'},
  {name: 'Про відрахування', value: 'deduction'},
  {name: 'Про переведення на курс', value: 'transition-course'},
  {name: 'Про зміну прізвища', value: 'name-change'},
  {name: 'Про зміну ім\'я', value: 'surname-change'},
  {name: 'Про продовження навчання для здачі ЕК та захисту ВБР', value: 'continuance-exam-passing'},
  {name: 'Про надання академвідпустки', value: 'academy-vacation'},
  {name: 'Про продовження академвідпустки', value: 'academy-vacation-continuance'},
  {name: 'Про затвердження тем випускних (кваліфікаційних) робіт', value: 'theme-graduate-approval'},
  {name: 'Про проведення практики', value: 'practice'},
  {name: 'Про проведення екскурсії', value: 'excursion'}
];

export const orderReasons = [
  {name: 'За власним бажанням', value: 'voluntarily'},
  {name: 'За несплату', value: 'non-payment'}
];
