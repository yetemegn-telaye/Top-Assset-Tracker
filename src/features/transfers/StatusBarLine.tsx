import { faCheck, faCheckCircle, faCheckDouble, faHome, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";


interface StatusBarLineProps {
    status: string[];
    currentStatus: string;
    icons: JSX.Element[];
  
}

const StatusBarLine: React.FC<StatusBarLineProps> = ({status, currentStatus, icons})=>{
    return(
        <div className="flex gap-2 items-center bg-gray-100 rounded shadow-md w-auto p-3 inline-block">
      {status.map((stat, index) => (
        <React.Fragment key={index}>
          <div className={`flex gap-2 items-center text-sm rounded p-2 ${currentStatus === stat ? 'bg-secondary-lighter text-accent' : 'bg-accent-lighter text-accent'}`}>
            {icons[index]}
            {stat}
            {currentStatus === stat && <FontAwesomeIcon icon={faCheckCircle} />}
          </div>
          {index < status.length - 1 && <hr className="w-10 border border-accent-light" />}
        </React.Fragment>
      ))}
    </div>
    )
}
export default StatusBarLine;