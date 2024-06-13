import { faBell, faEye, faTrash, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { JSXElementConstructor } from "react";


const NotificationCard: React.FC<any> = ({ notificationObj }) => {
    return (
        <div className="bg-background border flex gap-4 items-center p-4 rounded-lg shadow-lg hover:bg-accent-lighter ">
            <FontAwesomeIcon icon={faBell} className="text-info text-sm animate-pulse" />
            <div className="flex flex-col gap-1">
                <h5 className={`text-sm text-${(notificationObj.notification.message.includes('delayed'))? 
                'error-light':(notificationObj.notification.message.includes('waiting'))? 
                'yellow-500':'gray-500'} ${(notificationObj.notification.message.includes('waiting'))? 'animate-bounce': ''}`}>
                   {notificationObj.notification.message}
                    </h5>
                <p className="text-secondary text-xs">2 minutes ago</p>
            </div>
            <div className="flex gap-4 ml-auto">
            <FontAwesomeIcon icon={faEye} className="text-secondary ml-auto" />
            <FontAwesomeIcon icon={faTrash} className="text-error-light ml-auto" />
            </div>
        </div>
    );
    }
export default NotificationCard;