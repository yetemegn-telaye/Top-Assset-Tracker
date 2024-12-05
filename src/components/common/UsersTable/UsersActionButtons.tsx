import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

interface SettingActionButtonsProps<T> {
  row: T;
//   onEdit: (row: T) => void;
//   onView: (row: T) => void;
   onDelete: () => void;
}

const SettingActionButtons = <T extends object>({ row, onDelete }: SettingActionButtonsProps<T>) => {

  

  return (
    <div className="flex justify-center gap-2">
      {/* <button onClick={() => onEdit(row)} className="text-primary-light hover:text-primary">
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button onClick={() => onView(row)} className="text-secondary-light hover:text-secondary">
        <FontAwesomeIcon icon={faEye} />
      </button> */}
      <button onClick={onDelete} className="text-error-light hover:text-error">
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default SettingActionButtons;
