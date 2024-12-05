import { faBell, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";




const NotificationCard: React.FC<any> = ({ notificationObj,handleClear }) => {
  // Calculate the time difference between now and the last updated time
  const lastUpdated = notificationObj.updated_at
    ? Math.floor((new Date().getTime() - new Date(notificationObj.updated_at).getTime()) / 60000)
    : 0;

  // Format the last updated time
  const formattedTime = () => {
    if (lastUpdated < 1) {
      return "Just now";
    } else if (lastUpdated < 60) {
      return `${lastUpdated} minutes ago`;
    } else if (lastUpdated < 1440) {
      return `${Math.floor(lastUpdated / 60)} hours ago`;
    } else {
      return `${Math.floor(lastUpdated / 1440)} days ago`;
    }
  };
 

  return (
    <div className="bg-background border flex gap-4 items-center p-4 rounded-lg shadow-lg hover:bg-accent-lighter">
      <FontAwesomeIcon icon={faBell} className="text-info text-sm animate-pulse" />
      <div className="flex flex-col gap-1">
        <h5
          className={`text-sm text-${
            notificationObj.notification.message.includes("delayed")
              ? "error-light"
              : notificationObj.notification.message.includes("waiting")
              ? "yellow-500"
              : "gray-500"
          } ${
            notificationObj.notification.message.includes("waiting") ? "animate-bounce" : ""
          }`}
        >
          {notificationObj.notification.message}
        </h5>
        <p className="text-secondary text-xs">{formattedTime()}</p>
      </div>
      <div className="flex gap-4 ml-auto">
        <button className="text-primary-lighter hover:text-info" onClick={()=>handleClear(notificationObj.id)}>Clear</button>
        {/* <FontAwesomeIcon icon={faTrash} className="text-error-light" /> */}
      </div>
    </div>
  );
};

export default NotificationCard;
