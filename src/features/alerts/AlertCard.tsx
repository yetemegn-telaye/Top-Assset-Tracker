import { faBell, faExclamation, faEye, faTrash, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const AlertCard: React.FC<any> = ({ alertObj }) => {
    return (
        <div className="bg-error-lighter border flex gap-4 items-center p-4 rounded-lg shadow-lg hover:bg-accent-lighter ">
            <FontAwesomeIcon icon={faExclamation} className="text-error-light text-sm animate-pulse" />
            <div className="flex flex-col gap-1">
                <h5 className={`text-sm text-${(alertObj.notification.message.includes('delayed'))? 
                'error-light':(alertObj.notification.message.includes('waiting'))? 
                'yellow-500':'gray-500'} ${(alertObj.notification.message.includes('waiting'))? 'animate-bounce': ''}`}>
                   {alertObj.notification.message}
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
export default AlertCard;