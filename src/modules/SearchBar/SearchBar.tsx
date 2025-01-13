import React, { useState, useEffect, ChangeEvent } from "react";
import { InputAdornment } from "@mui/material";
import useDebounce from "@/hooks/useDebounce";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { TextFieldProps } from "@mui/material/TextField";
import { StyledSearchBar, StyledInput } from "./SearchBar.styles";
import IconButton from "../../components/IconButton";

type SearchBarProps = TextFieldProps & {
  onSearch: (query: string) => void;
  placeholder?: string;
};

const SearchBar = ({ onSearch, placeholder, ...rest }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const searchQueryDebounced = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (searchQueryDebounced === null) return;

    onSearch(searchQueryDebounced);
  }, [searchQueryDebounced]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <StyledSearchBar>
      <StyledInput
        fullWidth
        hiddenLabel
        label="Search"
        variant="outlined"
        placeholder={placeholder}
        value={searchQuery || ""}
        onChange={handleSearchChange}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {searchQuery ? (
                <IconButton onClick={handleClearSearch} edge="end">
                  <ClearIcon />
                </IconButton>
              ) : (
                <SearchIcon />
              )}
            </InputAdornment>
          ),
        }}
        {...rest}
      />
    </StyledSearchBar>
  );
};
export default SearchBar;
