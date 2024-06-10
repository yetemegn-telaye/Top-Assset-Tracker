import { faBell, faExclamation, faMoon, faSearch, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchInput from "../common/SearchInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {

    const getCurrentTime = () => {
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: '2-digit', year: 'numeric' };
      const currentDate = new Date();
      return new Intl.DateTimeFormat('en-US', options).format(currentDate);
    };
    
    const isDayTime = () => {
      const currentHour = new Date().getHours();
      return currentHour >= 6 && currentHour < 18;
    };
    
    const currentDate = getCurrentTime();
    const dayTime = isDayTime();
    
    const [searchTerm,setSearchTerm] = useState("");
    const navigate = useNavigate();
    const handleBellClick = () => {
      navigate('/notifications');
    }
    return (
        <div className="bg-background-paper rounded-xl shadow-md border border-gray-200 flex items-center justify-between gap-8 w-full p-5">
      
          <SearchInput setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
          <div className="flex items-center justify-center gap-4">
          <FontAwesomeIcon icon={dayTime ? faSun : faMoon} className={dayTime ? "text-yellow-500" : "text-blue-500"} />
            <p className="text-sm text-accent">{currentDate}</p>
          </div>
          
          <div className="flex items-center justify-center gap-7 mr-6">
            <button className="cursor-pointer"><FontAwesomeIcon icon={faExclamation} className="text-error-light text-2xl"/></button>
            <button onClick={handleBellClick}><FontAwesomeIcon icon={faBell} className="text-info text-2xl hover:text-info-light" /></button>
          </div>
        </div>
    );
}
export default SearchBar;