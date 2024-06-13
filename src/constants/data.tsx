interface Data {
  id: number;
  item_name: string;
  quantity: number;
  issuer: string;
  origin: string;
  destination: string;
  issued_date: string;
  status: string;
}

export const transferData: Data[] = [
    {id:1, item_name: 'Item 1', quantity: 28, issuer: 'Abebe', origin: 'Top 1', destination: 'Top 2', issued_date: 'May,07,2024', status: 'Pending...' },
    {id:2, item_name: 'Item 4', quantity: 211, issuer: 'Kebede', origin: 'Top 2', destination: 'Top 3', issued_date: 'May,05,2024', status: 'Received' },
    {id:2, item_name: 'Item 3', quantity: 283, issuer: 'Meron', origin: 'Top 4', destination: 'Top 1', issued_date: 'May,10,2024', status: 'Delayed' },
    {id:3, item_name: 'Item 3', quantity: 55, issuer: 'Tati', origin: 'Top 3', destination: 'Top 2', issued_date: 'May,06,2024', status: 'Pending...' },
    {id:4, item_name: 'Item 1', quantity: 28, issuer: 'Abebe', origin: 'Top 1', destination: 'Top 2', issued_date: 'May,07,2024', status: 'Pending...' },
    {id:5,item_name: 'Item 4', quantity: 211, issuer: 'Kebede', origin: 'Top 2', destination: 'Top 3', issued_date: 'May,05,2024', status: 'Received' },
    {id:6, item_name: 'Item 3', quantity: 283, issuer: 'Meron', origin: 'Top 4', destination: 'Top 1', issued_date: 'May,10,2024', status: 'Delayed' },
    {id:7, item_name: 'Item 3', quantity: 55, issuer: 'Tati', origin: 'Top 3', destination: 'Top 2', issued_date: 'May,06,2024', status: 'Returnables' },
    {id:6, item_name: 'Item 3', quantity: 283, issuer: 'Meron', origin: 'Top 4', destination: 'Top 1', issued_date: 'May,10,2024', status: 'Approved' },
    {id:7, item_name: 'Item 3', quantity: 55, issuer: 'Tati', origin: 'Top 3', destination: 'Top 2', issued_date: 'May,06,2024', status: 'Approved' },

  ];
  export enum TransferStatus {
    AT_ORIGIN = 'at_origin',
    AT_DESTINATION = 'at_destination',
    IN_TRANSIT = 'in_transit',
    WAITING_FOR_APPROVAL = 'waiting_for_approval',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    CANCELED = 'canceled'
  }