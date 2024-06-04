import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBox, faCheck, faCheckDouble, faClock, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface StatusCardProps {
    status: string;
    progress: number;
    icon: string;
  }
const StatusCard: React.FC<StatusCardProps> = ({status, progress, icon}) => {
    return (
        <div className="flex flex-col gap-3 justify-center bg-background-paper items-center h-auto w-48 max-w-xs p-4 rounded-lg overflow-hidden shadow-md">
            <div className="flex items-center justify-center gap-4">
                {icon==='faClock' ? <FontAwesomeIcon icon={faClock} className="text-xl text-secondary" />:
                 icon ==='faCheck' ? <FontAwesomeIcon icon={faCheckDouble} className="text-xl text-secondary" />:
                 icon==='faTruck' ? <FontAwesomeIcon icon={faTruck} className="text-xl text-secondary" />:
                  <FontAwesomeIcon icon={faBox} className="text-xl text-secondary" />
                }
                <h5 className=" text-primary">{status}</h5>
            </div>
        <div className={`px-2 pt-1 pb-1 bg-${status==='Delayed'? 'error':'primary'}-lighter rounded-md`}>
            {progress}
        </div>
        </div>
    );
    }
export default StatusCard;