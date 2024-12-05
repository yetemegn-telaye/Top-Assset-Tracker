import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faEye, faRepeat, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../../../redux/store';
import { selectIsItemReturnLoading, selectItemReturnError } from '../../../features/returnables/ReturnablesSlice';
import ErrorDisplay from '../ErrorDisplay';

interface ReturnActionsProps<T> {
  row: T;
  onReturn: (row: T) => void;
}

const ReturnActions = <T extends object>({ row,onReturn }: ReturnActionsProps<T>) => {

    const isItemReturnLoading = useAppSelector(selectIsItemReturnLoading);
  const itemReturnError = useAppSelector(selectItemReturnError);

  return (
    <div className="flex justify-center gap-4">
        {
            isItemReturnLoading ? <span>Loading...</span>: itemReturnError ? <ErrorDisplay message={itemReturnError} /> :
             (
                <button onClick={() => onReturn(row)} className="text-primary-light hover:cursor-pointer hover:text-primary">
                <span className='mr-1'>Return</span>
                <FontAwesomeIcon icon={faRepeat} />
              </button>
            )
        }
    
    </div>
  );
};

export default ReturnActions;
