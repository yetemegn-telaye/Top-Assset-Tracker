import React from 'react';
import { useTable, Column } from 'react-table';
import Badge from '../Badge';

interface TableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
}

const DataTable = <T extends object>({ columns, data }: TableProps<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<T>({
    columns,
    data,
  });

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="min-w-full bg-white">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="text-center">
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 border-b border-t border-accent-lighter text-gray-600 text-sm font-medium"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-accent-lighter">
              {row.cells.map(cell => {
                const cellValue = cell.value;
                let cellClass = "px-6 py-4 text-accent font-light text-sm text-center";
                let cellContent = cell.render('Cell');
                if (cell.column.id === 'status') {
                  const color = cellValue === 'In transit' ? 'primary-lighter' : cellValue === 'Received' ? 'secondary-lighter' : 'error-lighter';
                  cellContent = <Badge color={color} value={cellValue} />;
                }
                return (
                  <td
                    {...cell.getCellProps()}
                    className={`${cellClass}`}
                  >
                    {cellContent}
                  </td>
                );
              })}
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
