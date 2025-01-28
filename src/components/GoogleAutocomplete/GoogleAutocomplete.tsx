import HomeIcon from "@mui/icons-material/Home";
import {
  CircularProgress,
  Autocomplete as MUIAutocomplete,
  TextField,
  TextFieldProps,
} from "@mui/material";
import useDebounce from "@/hooks/useDebounce";
import {
  Control,
  FieldValues,
  useController,
  useFormContext,
} from "react-hook-form";
import React, { SyntheticEvent, useState, useEffect, useRef } from "react";
import { AddressFields } from "@/types/application";
import fetchPredictions from "./actions";

export interface GoogleAddressFields {
  postcode?: string;
  addressLine1?: string;
  addressLine2?: string;
  town?: string;
  county?: string;
  country?: string;
}

export interface PredictionResponse {
  description: string;
  addressFields: GoogleAddressFields;
}

export interface GoogleAutocompleteOption {
  label: string;
  value: AddressFields;
}

export interface GoogleAutocompleteProps {
  name: string;
  control?: Control<FieldValues>;
  textFieldProps?: TextFieldProps;
  label?: string;
  placeholder?: string;
  onAddressSelected?: (value: AddressFields | string) => void;
  fullWidth?: boolean;
  onChange?: (e: SyntheticEvent<Element, Event>, value: AddressFields) => void;
}

const getLabelFromAddress = (value: AddressFields) =>
  value ? `${value.address_1}, ${value.county}` : "";

const GoogleAutocomplete: React.FC<GoogleAutocompleteProps> = ({
  control,
  name,
  label,
  placeholder,
  onAddressSelected,
  fullWidth = true,
  textFieldProps,
}) => {
  const context = useFormContext();
  const effectiveControl = control || context.control;

  const controller = useController({ control: effectiveControl, name });
  const { field } = controller;
  const { value, onChange } = field;

  const [options, setOptions] = useState<GoogleAutocompleteOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState<string>(
    getLabelFromAddress(value)
  );
  const [debouncedInputValue] = useDebounce(inputValue, 500);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current && value) {
      isFirstRender.current = false;
      const label = getLabelFromAddress(value);
      if (options.find(option => option.label === label)) return;
      setOptions(prevOptions => [
        {
          label,
          value,
        },
        ...prevOptions,
      ]);
    }
  }, []);

  useEffect(() => {
    if (getLabelFromAddress(value) === debouncedInputValue) return;
    const fetchOptions = async () => {
      if (!debouncedInputValue) {
        return;
      }
      setLoading(true);
      try {
        const predictions = await fetchPredictions(debouncedInputValue);
        setOptions(
          predictions
            .map((place: PredictionResponse) => {
              const { addressFields } = place;
              const { addressLine1, addressLine2, ...restAddress } =
                addressFields;

              const value = {
                address_1: addressLine1,
                address_2: addressLine2,
                ...restAddress,
              } as AddressFields;

              return {
                label: getLabelFromAddress(value),
                value,
              };
            })
            .reduce(
              (uniqueOptions, currentOption) => {
                const seenLabels = new Set(
                  uniqueOptions.map(option => option.label)
                );
                if (!seenLabels.has(currentOption.label)) {
                  uniqueOptions.push(currentOption);
                }
                return uniqueOptions;
              },
              [] as { label: string; value: AddressFields }[]
            )
        );
      } catch (error) {
        console.error("Error fetching address predictions:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, [debouncedInputValue]);

  const handleInputChange = (_: SyntheticEvent, newInputValue: string) => {
    setInputValue(newInputValue);
  };

  const getOptionLabel = (option: GoogleAutocompleteOption | string) => {
    if (typeof option === "string") return option;
    if (option?.label) return option.label;
    if (option?.value && getLabelFromAddress(option.value))
      return getLabelFromAddress(option.value);
    return "";
  };

  const handleOptionSelect = (
    _: SyntheticEvent,
    newValue: GoogleAutocompleteOption | string
  ) => {
    const selected = typeof newValue === "string" ? newValue : newValue?.value;
    if (selected) {
      onChange(onAddressSelected ? onAddressSelected(selected) : selected);
    }
  };

  return (
    <MUIAutocomplete
      freeSolo
      options={options}
      getOptionLabel={getOptionLabel}
      onInputChange={handleInputChange}
      onChange={handleOptionSelect}
      value={options.find(option => option.value === value) || ""}
      loading={loading}
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
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default GoogleAutocomplete;
