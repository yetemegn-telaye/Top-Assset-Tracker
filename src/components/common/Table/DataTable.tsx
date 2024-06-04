import React, { useState, useMemo } from 'react';
import { useTable, useSortBy, Column } from 'react-table';
import Badge from '../Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortAsc, faSortDesc, faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import Pagination from './Pagination';
import ActionButtons from './ActionButtons';

interface Data {
  item_name: string;
  quantity: number;
  issuer: string;
  origin: string;
  destination: string;
  issued_date: string;
  status: string;
}

interface TableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
}

const DataTable = <T extends object>({ columns, data }: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const changePage = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginatedData = useMemo(() => {
    return data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [currentPage, itemsPerPage, data]);

  const handleEdit = (row: T) => {
    console.log('Edit', row);
  };

  const handleView = (row: T) => {
    console.log('View', row);
  };

  const handleDelete = (row: T) => {
    console.log('Delete', row);
  };

  const actionsColumn: Column<T> = {
    Header: 'Actions',
    accessor: 'actions' as keyof T,
    Cell: ({ row }: { row: any }) => (

      <ActionButtons row={row.original} onEdit={handleEdit} onView={handleView} onDelete={handleDelete} />
    ),
  };

  const extendedColumns = useMemo(() => [...columns, actionsColumn], [columns]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<T>(
    {
      columns: extendedColumns,
      data: paginatedData,
    },
    useSortBy
  );

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="min-w-full bg-white">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="text-center">
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 py-3 border-b border-t border-accent-lighter text-gray-600 hover:text-info text-sm font-medium cursor-pointer"
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <FontAwesomeIcon icon={faSortDesc} className='text-secondary ml-2' />
                        : <FontAwesomeIcon icon={faSortAsc} className='text-secondary ml-2' />
                      : column.id === 'issuer' ? <FontAwesomeIcon icon={faSort} className='text-secondary ml-2' /> : ''}
                  </span>
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
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} />
    </div>
  );
};

export default DataTable;
