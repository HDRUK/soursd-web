import React, { useState, useEffect, ChangeEvent } from "react";
import { InputAdornment } from "@mui/material";
import useDebounce from "@/hooks/useDebounce";
import SearchIcon from "@mui/icons-material/Search";
import { TextFieldProps } from "@mui/material/TextField";
import { StyledSearchBar, StyledInput } from "./SearchBar.styles";

type SearchBarProps = TextFieldProps & {
  onSearch: (query: string) => void;
  placeholder?: string;
};

const SearchBar = ({ onSearch, placeholder, ...rest }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchQueryDebounced = useDebounce(searchQuery, 500);
  useEffect(() => {
    onSearch(searchQueryDebounced);
  }, [searchQueryDebounced]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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
        {...rest}
      />
    </StyledSearchBar>
  );
};
export default SearchBar;
