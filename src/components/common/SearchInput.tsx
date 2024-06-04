import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface SearchInputProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
}

const SearchInput : React.FC<SearchInputProps> = ({setSearchTerm,searchTerm}) => {
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Search"
        name="search"
        value={searchTerm}
        onChange={handleChange}
        className="rounded-md shadow-md bg-gray-100 p-3 pr-12"
      />
      <FontAwesomeIcon
        icon={faSearch}
        className="text-accent absolute right-6 top-1/2 hover:text-secondary transform -translate-y-1/2"
      />
    </div>
  );
};

export default SearchInput;
