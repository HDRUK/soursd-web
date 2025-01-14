import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
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

const GoogleAutocompleteWithControl = (
  props: Omit<GoogleAutocompleteProps, "control">
) => {
  const { control } = useForm();
  return <GoogleAutocomplete control={control} {...props} />;
};

export const Basic: Story = {
  args: {
    name: "address",
    label: "Choose an address",
    fullWidth: true,
    onAddressSelected: mockOnAddressSelected,
  } as Omit<GoogleAutocompleteProps, "control">,
  render: args => <GoogleAutocompleteWithControl {...args} />,
};
