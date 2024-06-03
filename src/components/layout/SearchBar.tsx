import { faBell, faExclamation, faSearch, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchInput from "../common/SearchInput";

const SearchBar = () => {

    const currentDate = new Date().toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            year: "numeric",
            day: "numeric",
        }
       
    );
    

    return (
        <div className="bg-background-paper rounded-xl shadow-md border border-gray-200 flex items-center justify-between gap-8 w-full p-5">
      
          <SearchInput />
          <div className="flex items-center justify-center gap-4">
            <FontAwesomeIcon icon={faSun} className="text-yellow-500" />
            <p className="text-sm text-accent">{currentDate}</p>
          </div>
          
          <div className="flex items-center justify-center gap-4 mr-6">
            <FontAwesomeIcon icon={faExclamation} size='2x' className="text-error-light"/>
            <FontAwesomeIcon icon={faBell} size='2x' className="text-info" />
          </div>
        </div>
    );
}
export default SearchBar;