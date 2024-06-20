
import { useState } from "react";


type FilterOptionsProps = {
    setSelectedStatus: (status: string) => void;
    transferStatus: string[];
};
const FilterOptions: React.FC<FilterOptionsProps> = ({setSelectedStatus,transferStatus}) => {
  const [activeStatus, setActiveStatus] = useState('All');

  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
    if(status === 'Approval Required'){
      status = 'waiting_for_approval'
    } else if(status === 'Approved'){
      status = 'approved'
    } else if(status=== 'In transit'){
      status = 'in_transit'
    }
    else if(status === 'Returnables'){
      status = 'returnables'
    }else if(status === 'Delayed'){
      status = 'delayed'
    }else if(status ==='Received'){
      status = 'at_destination'
    }
    else{
      status = 'All'
    }
    setSelectedStatus(status);
    console.log(status);
    console.log(transferStatus);
};
    return(
        <div className="">
        <div className="flex flex-col gap-0 mt-4">
            
            <ul className="inline-block p-4">
                   {transferStatus.map((stat: any, index: number) => (
                       <li key={index} className="inline-block text-xs text-accent hover:text-secondary hover:cursor-pointer">
                        <button
                        onClick={() => handleStatusChange(stat)}
                          className={`text-md py-2 px-4 rounded-lg transition-colors duration-300
                  ${activeStatus === stat
                    ? "text-secondary hover:bg-accent-lighter hover:text-secondary"
                    : "text-gray-500  hover:bg-accent-lighter hover:text-secondary"}`}>{stat}</button>
                       </li>
                     ))}
                     
            </ul>
            <div className="divider mt-0"></div>
        </div>
      </div> 
    );
}
export default FilterOptions;