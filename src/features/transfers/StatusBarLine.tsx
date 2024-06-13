import { faCheck, faCheckCircle, faCheckDouble, faHome, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { TransferStatus } from "../../constants/data";


interface StatusBarLineProps {
    currentStatus: string;
    icons: JSX.Element[];
  
}

const StatusBarLine: React.FC<StatusBarLineProps> = ({ currentStatus, icons})=>{
    const status=[TransferStatus.WAITING_FOR_APPROVAL,TransferStatus.APPROVED, TransferStatus.IN_TRANSIT, TransferStatus.AT_DESTINATION];

    return(
        <div className="flex gap-3 items-center justify-center bg-gray-100 rounded shadow-md w-full p-4 px-7 inline-block">
      {status.map((stat, index) => (
        <React.Fragment key={index}>
          <div className={`flex gap-2 items-center text-sm rounded p-2 ${currentStatus === stat ? 'bg-secondary text-white' : 'bg-accent-lighter text-accent'}`}>
            {icons[index]}
            {stat}
            {currentStatus === stat && <FontAwesomeIcon icon={faCheckCircle} />}
          </div>
          {index < status.length - 1 && <hr className="w-20 border border-accent-light" />}
        </React.Fragment>
      ))}
    </div>
    )
}
export default StatusBarLine;