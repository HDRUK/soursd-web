import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import SelectInput, { SelectInputProps } from "./SelectInput";

export default {
  title: "Components/SelectInput",
  component: SelectInput,
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    options: { control: "object" },
    onChange: { action: "changed" },
  },
} as Meta<typeof SelectInput>;

const Template: StoryFn<typeof SelectInput> = ({
  label,
  value: initialValue,
  options,
  onChange,
}: SelectInputProps) => {
  const [value, setValue] = useState<string | null>(initialValue || null);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <SelectInput
      options={options}
      label={label}
      value={value}
      onChange={handleChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Select an option",
  value: "",
  options: [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ],
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  label: "Select an option",
  value: "option2",
  options: [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ],
};
