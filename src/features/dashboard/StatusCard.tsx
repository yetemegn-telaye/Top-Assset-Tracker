
interface StatusCardProps {
    status: string;
    progress: number;
  }
const StatusCard: React.FC<StatusCardProps> = ({status, progress}) => {
    return (
        <div className="flex flex-col gap-3 justify-center bg-background-paper items-center h-auto w-48 max-w-xs p-4 rounded-lg overflow-hidden shadow-md">
            <div>
                <h5 className=" text-primary">{status}</h5>
            </div>
        <div className={`px-2 pt-1 pb-1 bg-${status==='Delayed Orders'? 'error':'primary'}-lighter rounded-md`}>
            {progress}
        </div>
        </div>
    );
    }
export default StatusCard;