import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import GoogleAutocomplete, {
  GoogleAutocompleteProps,
  AddressFields,
} from "./GoogleAutocomplete";

const meta = {
  title: "components/GoogleAutocomplete",
  component: GoogleAutocomplete,
  tags: ["autodocs"],
} satisfies Meta<typeof GoogleAutocomplete>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockOnAddressSelected = (fields: AddressFields) => {
  console.log("Selected address:", fields);
};

const GoogleAutocompleteWithProvider = ({
  label,
  onAddressSelected,
  fullWidth,
}: GoogleAutocompleteProps) => {
  return (
    <GoogleAutocomplete
      label={label}
      onAddressSelected={onAddressSelected}
      fullWidth={fullWidth}
    />
  );
};

export const Basic: Story = {
  args: {
    label: "Choose an address",
    fullWidth: true,
    onAddressSelected: mockOnAddressSelected,
  },
  render: props => <GoogleAutocompleteWithProvider {...props} />,
};
