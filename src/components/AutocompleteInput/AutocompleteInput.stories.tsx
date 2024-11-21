import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import AutocompleteInput, { AutocompleteInputProps } from "./AutocompleteInput";

export default {
  title: "Components/AutocompleteInput",
  component: AutocompleteInput,
  argTypes: {
    options: { control: "object" },
    label: { control: "text" },
    placeholder: { control: "text" },
    value: { control: "text" },
    onChange: { action: "changed" },
  },
} as Meta<typeof AutocompleteInput>;

const Template: StoryFn<typeof AutocompleteInput> = ({
  options,
  label,
  placeholder,
  value: initialValue,
  onChange,
}: AutocompleteInputProps) => {
  const [value, setValue] = useState<string | null>(initialValue || null);

  return (
    <AutocompleteInput
      options={options}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={newValue => {
        setValue(newValue);
        onChange(newValue);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  options: [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ],
  label: "Select an option",
  value: null,
  placeholder: "Type to search...",
};

export const PreSelected = Template.bind({});
PreSelected.args = {
  ...Default.args,
  value: "option2",
};
