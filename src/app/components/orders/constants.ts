export const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
};

export const colDefOrderNumber = {
  headerName: 'Номер наказу',
  field: 'number',
  checkboxSelection: true,
  minWidth: 80
};

export const colDefOrderType = {
  headerName: 'Тип',
  field: 'type',
  minWidth: 180
};

export const colDefOrderDate = {
  headerName: 'Дата',
  field: 'date',
  minWidth: 160
};

export const colDefOrderStatus = {
  headerName: 'Статус',
  field: 'status',
  minWidth: 140
};


/*
number
type
date
status
 */

export const ordersDefaults = [
  colDefOrderNumber,
];
