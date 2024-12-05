import { faExclamation, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const AlertCard: React.FC<any> = ({ alertObj }) => {
  
  return (
    <div className="bg-error-lighter border flex gap-4 items-center p-4 rounded-lg shadow-lg hover:bg-accent-lighter">
      <FontAwesomeIcon icon={faExclamation} className="text-error-light text-sm animate-pulse" />
      <div className="flex flex-col gap-1">
        <h5
          className={`text-sm text-accent`}
        >
          {alertObj.text}
        </h5>
       
      </div>
      <div className="flex gap-4 ml-auto">
        <button className="text-primary-lighter hover:text-error">Clear</button>
      </div>
    </div>
  );
};

export default AlertCard;
