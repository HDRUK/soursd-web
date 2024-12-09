import React from "react";
import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { StyledSearchBar, StyledInput } from "./SearchBar.styles";
// Define the shape of the option used in Autocomplete
interface Option {
  label: string;
  value: string;
}

const SearchBar = ({ placeholder, ...rest }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
    console.log("Search Query:", event.target.value);
  };

  return (
    <StyledSearchBar>
      <StyledInput
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </StyledSearchBar>
  );
};
export default SearchBar;
