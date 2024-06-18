import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useTable, useSortBy, Column } from 'react-table';
import Badge from '../Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortAsc, faSortDesc } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';
import ErrorDisplay from '../ErrorDisplay';
import Pagination from '../Table/Pagination';
import ReturnActions from './ReturnActions';

// interface Data {
//   id: number;
//   item_name: string;
//   quantity: number;
//   issuer: string;
//   origin: string;
//   destination: string;
//   issued_date: string;
//   status: string;
// }

interface TableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  isLoading: boolean;
  error: string| null;
}

const RetunablesTable = <T extends object>({ columns, data, isLoading,error }: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const navigate = useNavigate();

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
    const {id} = row as any;
    navigate(`/transfers/${id}`); 
  };

  const handleDelete = (row: T) => {
    console.log('Delete', row);
  };

  const handleRowClick = (e: any) => {
    const id = e.target.parentElement.children[0].textContent;
    navigate(`/transfers/${id}`);
  };

  const actionsColumn: Column<T> = {
    Header: 'Actions',
    accessor: 'actions' as keyof T,
    Cell: ({ row }: { row: any }) => (
      <ReturnActions row={row.original} onEdit={handleEdit} onView={handleView} onDelete={handleDelete} />
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
           <td colSpan={columns.length} className="h-64">
             <div className="flex justify-center items-center h-full">
               <LoadingSpinner />
             </div>
           </td>
         </tr>
       </tbody>
      ) : error!=null ? (
        <tbody>
         <tr>
           <td colSpan={columns.length} className="h-64">
             <div className="flex justify-center items-center h-full">
               <ErrorDisplay message={error} />
             </div>
           </td>
         </tr>
       </tbody>
      ) : (
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover:bg-secondary-lighter cursor-pointer" onClick={handleRowClick}>
                    {row.cells.map(cell => {
                      const cellValue = cell.value;
                      let cellClass = "px-6 py-4 text-accent font-light text-sm text-center";
                      let cellContent = cell.render('Cell');
                      if (cell.column.id === 'status') {
                        const color = cellValue === 'waiting_for_approval' ? 'primary-lighter' : cellValue === 'approved' ? 'secondary-lighter' : cellValue=== 'returnables' ? 'accent-light' : cellValue=== 'in_transit' ? 'secondary-lighter' : cellValue==='at_destination'? 'secondary-light': 'error-lighter';
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
      )}
          </table>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} />
        
    </div>
  );
};

export default RetunablesTable;
