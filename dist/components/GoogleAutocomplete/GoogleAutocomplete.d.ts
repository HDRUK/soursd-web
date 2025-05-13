import { TextFieldProps } from "@mui/material";
import { Control, FieldValues } from "react-hook-form";
import React, { SyntheticEvent } from "react";
import { AddressFields } from "@/types/application";
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
declare const GoogleAutocomplete: React.FC<GoogleAutocompleteProps>;
export default GoogleAutocomplete;
