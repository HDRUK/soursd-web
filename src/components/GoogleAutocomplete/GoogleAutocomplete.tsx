import HomeIcon from "@mui/icons-material/Home";
import {
  CircularProgress,
  Autocomplete as MUIAutocomplete,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import fetchPredictions from "./actions";

export interface AddressFields {
  postcode?: string;
  addressLine1?: string;
  addressLine2?: string;
  town?: string;
  county?: string;
  country?: string;
}

export interface GoogleAutocompleteOption {
  label: string;
  addressFields: AddressFields;
}

export interface GoogleAutocompleteProps {
  textFieldProps?: TextFieldProps;
  label?: string;
  placeholder?: string;
  onAddressSelected?: (fields: AddressFields) => void;
  fullWidth?: boolean;
  onChange?: (e: SyntheticEvent<Element, Event>, data: AddressFields) => void;
}

const GoogleAutocomplete: React.FC<GoogleAutocompleteProps> = ({
  onAddressSelected,
  label,
  fullWidth = true,
  onChange,
  placeholder,
  textFieldProps,
  ...restProps
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>();

  const handleChange = (
    e: SyntheticEvent<Element, Event>,
    option: GoogleAutocompleteOption
  ) => {
    onChange?.(e, option.addressFields);
  };

  const handleInputChange = async (_, value) => {
    setInputValue(value);
    if (value.length < 3) return;
    setLoading(true);
    try {
      // Fetch predictions using the server-side function
      const predictions = await fetchPredictions(value);
      onAddressSelected?.(predictions[0].addressFields);
      setOptions(
        predictions.map(place => {
          const { description, addressFields } = place;

          return {
            label: description,
            addressFields,
          };
        })
      );
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
      onChange={handleChange}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          fullWidth={fullWidth}
          size="small"
          {...textFieldProps}
          sx={
            !label
              ? {
                  ".MuiFilledInput-root.MuiInputBase-root": {
                    p: "8.5px 14px",
                  },
                }
              : {}
          }
          InputProps={{
            ...params.InputProps,
            placeholder,
            startAdornment: <HomeIcon />,
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
      {...restProps}
    />
  );
};

export default GoogleAutocomplete;
