export const defaultColDef = {
  sortable: true,
  // resizable: true,
};

export const colDefOrderNumber = {
  headerName: 'Номер наказу',
  field: 'number',
  checkboxSelection: true,
};

export const colDefOrderType = {
  headerName: 'Тип',
  field: 'type',
  minWidth: 225
};

export const colDefOrderDate = {
  headerName: 'Дата',
  field: 'date',
  type: ['dateColumn'],
  width: 250
};

export const colDefOrderStatus = {
  headerName: 'Статус',
  field: 'status',
  minWidth: 250,
  cellStyle: (statusCell) => {
    switch (statusCell.value) {
      case 'Активний': return {color: '#5cb85c', fontWeight: 900};
      case 'Проект' : return  {color: '#ffc71f', fontWeight: 900};
      case 'Відхилений' : return {color: 'rgba(255, 61, 29, 0.92)', fontWeight: 900}
      default: return {color: 'grey'}
    }
  }
};

export const ordersDefaults = [
  colDefOrderNumber,
  colDefOrderType,
  colDefOrderDate,
  colDefOrderStatus
];
