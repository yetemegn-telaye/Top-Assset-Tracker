import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useTable, useSortBy, Column } from 'react-table';
import Badge from '../Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortAsc, faSortDesc } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Table/Pagination';
import UsersActionButtons from './UsersActionButtons';
import LoadingSpinner from '../LoadingSpinner';
import ErrorDisplay from '../ErrorDisplay';

interface Data {
  id: number;
  name: string;
  email: string;
  phone: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  role: string;
  location_id: string;
  role_name: string;
}

interface TableProps<T extends Data> {
  columns: Column<T>[];
  data: T[];
  isLoading: boolean;
  errorMessage: string | null;
}

const UsersTable = <T extends Data>({ columns, data, isLoading, errorMessage }: TableProps<T>) => {
  const [tableData, setTableData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const navigate = useNavigate();

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const changePage = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginatedData = useMemo(() => {
    return tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [currentPage, itemsPerPage, tableData]);

  const handleDelete = useCallback((id: number) => {
    setTableData(prevData => prevData.filter(item => item.id !== id));
  }, []);

  const actionsColumn: Column<T> = {
    Header: 'Actions',
    accessor: 'actions' as keyof T,
    Cell: ({ row }: { row: any }) => (
      <UsersActionButtons row={row.original} onDelete={() => handleDelete(row.original.id)} />
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
    <div className="overflow-x-auto overflow-y-auto">
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
        {isLoading ? (
          <tbody>
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
               <LoadingSpinner/>
              </td>
            </tr>
          </tbody>
        ) : errorMessage ? (
          <tbody>
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
               <ErrorDisplay message={errorMessage}/>
              </td>
            </tr>
          </tbody>
        ) :
         (
          <tbody {...getTableBodyProps()}>
          
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-secondary-lighter cursor-pointer">
                {row.cells.map(cell => {
                  const cellValue = cell.value;
                  let cellClass = "px-6 py-4 text-accent font-light text-sm text-center";
                  let cellContent = cell.render('Cell');
                  if (cell.column.id === 'status') {
                    const color = cellValue === 'waiting_for_approval' ? 'primary-lighter' : cellValue === 'approved' ? 'secondary-lighter' : cellValue === 'returnables' ? 'accent-light' : cellValue === 'in_transit' ? 'secondary-lighter' : cellValue === 'at_destination' ? 'secondary-light' : 'error-lighter';
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
        )
        
      }
        
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} />
    </div>
  );
};

export default UsersTable;
