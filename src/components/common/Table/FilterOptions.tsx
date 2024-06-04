
import { useState } from "react";


type TripsDataActionsProps = {
    setSelectedStatus: (status: string) => void;
    tripStatus: string[];
};
const TripsDataActions: React.FC<TripsDataActionsProps> = ({setSelectedStatus, tripStatus}) => {
  const [activeStatus, setActiveStatus] = useState('All');

  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
    setSelectedStatus(status);
};
    return(
        <div className="mt-5">
        <div className="flex flex-col gap-0 mt-4">
            
            <ul className="inline-block p-4 gap-5">
                   {tripStatus.map((stat: any, index: number) => (
                       <li key={index} className="inline-block text-md text-gray-500 mr-6 hover:text-purple-500 hover:cursor-pointer">
                        <button
                        onClick={() => handleStatusChange(stat)}
                          className={`text-md py-2 px-4 rounded-lg transition-colors duration-300
                  ${activeStatus === stat
                    ? "bg-purple-500 text-white hover:bg-purple-600"
                    : "text-gray-500 hover:text-purple-500 hover:bg-purple-100"}`}>{stat}</button>
                       </li>
                     ))}
                     
            </ul>
            <div className="divider mt-0"></div>
        </div>
      </div> 
    );
}
export default TripsDataActions;