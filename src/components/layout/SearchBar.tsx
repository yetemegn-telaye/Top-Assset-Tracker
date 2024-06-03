import { faBell, faExclamation, faMoon, faSearch, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchInput from "../common/SearchInput";

const SearchBar = () => {

    // const currentDate = new Date().toLocaleDateString(
    //     "en-US",
    //     {
    //         weekday: "long",
    //         year: "numeric",
    //         day: "numeric",
    //     }
       
    // );
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
    

    return (
        <div className="bg-background-paper rounded-xl shadow-md border border-gray-200 flex items-center justify-between gap-8 w-full p-5">
      
          <SearchInput />
          <div className="flex items-center justify-center gap-4">
          <FontAwesomeIcon icon={dayTime ? faSun : faMoon} className={dayTime ? "text-yellow-500" : "text-blue-500"} />
            <p className="text-sm text-accent">{currentDate}</p>
          </div>
          
          <div className="flex items-center justify-center gap-4 mr-6">
            <FontAwesomeIcon icon={faExclamation} className="text-error-light text-2xl"/>
            <FontAwesomeIcon icon={faBell} className="text-info text-2xl" />
          </div>
        </div>
    );
}
export default SearchBar;