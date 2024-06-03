import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchInput = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="rounded-md ml-4 shadow-md bg-accent-lighter p-3 pr-10"
      />
      <FontAwesomeIcon
        icon={faSearch}
        className="text-accent absolute right-6 top-1/2 transform -translate-y-1/2"
      />
    </div>
  );
};

export default SearchInput;
