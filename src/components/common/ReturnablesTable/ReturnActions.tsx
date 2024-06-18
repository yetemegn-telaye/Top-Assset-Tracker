import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faEye, faRepeat, faTrash } from '@fortawesome/free-solid-svg-icons';

interface ReturnActionsProps<T> {
  row: T;
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
}

const ReturnActions = <T extends object>({ row, onEdit,onDelete }: ReturnActionsProps<T>) => {

  

  return (
    <div className="flex justify-center gap-4">
     <button onClick={() => onDelete(row)} className="text-primary-light hover:cursor-pointer hover:text-primary">
        <span className='mr-1'>Return</span>
        <FontAwesomeIcon icon={faRepeat} />
      </button>
      {/* <button onClick={() => onEdit(row)} className="text-secondary-light hover:text-secondary">
        <FontAwesomeIcon icon={faEdit} />
      </button> */}
    
    
    </div>
  );
};

export default ReturnActions;
