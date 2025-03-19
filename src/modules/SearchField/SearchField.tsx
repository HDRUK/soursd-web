import useDebounce from "@/hooks/useDebounce";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { ChangeEvent, useEffect, useState } from "react";
import IconButton from "../../components/IconButton";

type SearchFieldProps = Omit<TextFieldProps, "change"> & {
  onSearch: (query: string) => void;
  onClear?: () => void;
  placeholder?: string;
};

const SearchField = ({
  onSearch,
  onClear,
  placeholder,
  ...rest
}: SearchFieldProps) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [searchQueryDebounced] = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (searchQueryDebounced === null) return;

    onSearch(searchQueryDebounced);
  }, [searchQueryDebounced]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onClear?.();
  };

  return (
    <TextField
      fullWidth
      hiddenLabel
      label="Search"
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
  );
};
export default SearchField;
