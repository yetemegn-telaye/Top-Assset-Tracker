import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { TransferStatus } from "../../constants/data";

interface StatusBarLineProps {
  currentStatus: string;
  icons: JSX.Element[];
}

const StatusBarLine: React.FC<StatusBarLineProps> = ({ currentStatus, icons }) => {
  const statuses = [
    TransferStatus.WAITING_FOR_APPROVAL,
    TransferStatus.APPROVED,
    TransferStatus.IN_TRANSIT,
    TransferStatus.AT_DESTINATION
  ];

  const currentStatusLabel = currentStatus === TransferStatus.COMPLETED ? 'Completed' : currentStatus === TransferStatus.ITEM_LOST ? 'Lost Item' : currentStatus=== TransferStatus.REJECTED ? 'Rejected' : '';

  return (
    <div className="flex gap-3 items-center justify-center bg-gray-100 rounded shadow-md w-full p-4 px-7 inline-block">
      {statuses.map((status, index) => (
        <React.Fragment key={index}>
          <div className={`flex gap-2 items-center text-sm rounded p-2 ${
            currentStatus === status ? 'bg-secondary text-white' : 'bg-accent-lighter text-accent'
          }`}>
            {icons[index]}
            {status}
            {currentStatus === status && <FontAwesomeIcon icon={faCheckCircle} />}
          </div>
          {index < statuses.length - 1 && <hr className="w-20 border border-accent-light" />}
        </React.Fragment>
      ))}
      {(currentStatus === TransferStatus.COMPLETED || currentStatus === TransferStatus.ITEM_LOST || currentStatus===TransferStatus.REJECTED) && (
        <>
          <hr className="w-20 border border-accent-light" />
          <div className={`flex gap-2 items-center text-sm rounded p-2 ${
            currentStatus === TransferStatus.COMPLETED ? 'bg-secondary text-white' : 'bg-error text-white'
          }`}>
            {currentStatusLabel === 'Completed' ? icons[statuses.length] : icons[statuses.length + 1]}
            {currentStatusLabel}
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
        </>
      )}
    </div>
  );
}

export default StatusBarLine;
