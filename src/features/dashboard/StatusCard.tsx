import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBox, faCheck, faCheckDouble, faClock, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface StatusCardProps {
    status: string;
    count: number;
    
  }
const StatusCard: React.FC<StatusCardProps> = ({status, count}) => {
    return (
        <div className="flex flex-col gap-2 bg-background-paper items-center h-24 w-48  max-w-xs py-4 rounded-lg overflow-hidden shadow-md">
            <div className="flex items-center gap-1 justify-center">
                {status==='delayed' ? <FontAwesomeIcon icon={faClock} className="text-xl text-secondary" />:
                 status ==='waiting_for_approval' ? <FontAwesomeIcon icon={faCheckDouble} className="text-xl text-secondary" />:
                 status==='waiting_for_transit' ? <FontAwesomeIcon icon={faTruck} className="text-xl text-secondary" />:
                 status==='in_transit' ? <FontAwesomeIcon icon={faTruck} className="text-xl text-secondary" />:
                  <FontAwesomeIcon icon={faBox} className="text-xl text-secondary" />
                }
                <h5 className={`text-primary text-sm text-center`}>{status}</h5>
            </div>
        <div className={`px-2 pt-1 pb-1 bg-${status==='Delayed'? 'error':'primary'}-lighter rounded-md`}>
            {count}
        </div>
        </div>
    );
    }
export default StatusCard;