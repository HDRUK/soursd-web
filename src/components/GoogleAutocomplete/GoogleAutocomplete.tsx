import React, { useState } from "react";
import {
  CircularProgress,
  Autocomplete as MUIAutocomplete,
  TextField,
} from "@mui/material";
import fetchPredictions from "./actions";

export interface AddressFields {
  postcode?: string;
  addressLine1?: string;
  addressLine2?: string;
  town?: string;
  county?: string;
  country?: string;
}

export interface GoogleAutocompleteProps {
  onAddressSelected: (fields: AddressFields) => void;
  label: string;
  fullWidth?: boolean;
}

const GoogleAutocomplete: React.FC<GoogleAutocompleteProps> = ({
  onAddressSelected,
  label,
  fullWidth = true,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>();

  const handleInputChange = async (_, value) => {
    setInputValue(value);
    if (value.length < 3) return;
    setLoading(true);
    try {
      // Fetch predictions using the server-side function
      const predictions = await fetchPredictions(value);
      onAddressSelected(predictions[0].addressFields);
      setOptions(predictions.map(place => place.description));
    } catch (error) {
      console.error("Error fetching address predictions:", error);
    }
    setLoading(false);
  };

  return (
    <MUIAutocomplete
      freeSolo
      options={options}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          fullWidth={fullWidth}
          {...rest}
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {" "}
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}{" "}
                {params.InputProps.endAdornment}{" "}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default GoogleAutocomplete;
