import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

interface ActionButtonsProps<T> {
  row: T;
  onEdit: (row: T) => void;
  onView: (row: T) => void;
  onDelete: (row: T) => void;
}

const ActionButtons = <T extends object>({ row, onEdit, onView, onDelete }: ActionButtonsProps<T>) => {

  

  return (
    <div className="flex justify-center gap-2">
      <button onClick={() => onEdit(row)} className="text-primary-light hover:text-primary">
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button onClick={() => onView(row)} className="text-secondary-light hover:text-secondary">
        <FontAwesomeIcon icon={faEye} />
      </button>
      <button onClick={() => onDelete(row)} className="text-error-light hover:text-error">
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default ActionButtons;
