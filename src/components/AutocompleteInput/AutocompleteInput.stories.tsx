import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { useForm, FormProvider } from "react-hook-form";
import { AutocompleteRenderInputParams, TextField } from "@mui/material";
import AutocompleteInput, { AutocompleteInputProps } from "./AutocompleteInput";

const meta = {
  title: "components/AutocompleteInput",
  component: AutocompleteInput,
  tags: ["autodocs"],
} satisfies Meta<typeof AutocompleteInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const AutocompleteInputWithProvider = (props: AutocompleteInputProps) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <AutocompleteInput
        label="AutocompleteInput"
        aria-label="AutocompleteInput"
        placeholder="AutocompleteInput"
        {...props}
      />
    </FormProvider>
  );
};

export const Basic: Story = {
  args: {
    options: [
      { label: "test1", value: "test1" },
      { label: "test2", value: "test2" },
    ],
    label: "Choose an option",
    placeholder: "Start typing...",
    value: null,
    renderInput: (params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        label="Choose an option"
        placeholder="Start typing..."
        variant="outlined"
        size="small"
      />
    ),
  },
  render: props => <AutocompleteInputWithProvider {...props} />,
};
