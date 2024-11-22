import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useForm, FormProvider } from "react-hook-form";
import SelectInput, { SelectInputProps } from "./SelectInput";

const meta = {
  title: "components/SelectInput",
  component: SelectInput,
  tags: ["autodocs"],
} satisfies Meta<typeof SelectInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const SelectInputWithProvider = (props: SelectInputProps) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <SelectInput
        label="Select an option"
        aria-label="Select an option"
        placeholder="Choose..."
        {...props}
      />
    </FormProvider>
  );
};

export const Basic: Story = {
  args: {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
    label: "Choose an option",
    placeholder: "Start typing...",
    value: "option1", // Set the default value
    onChange: event => console.log(event.target.value), // Example of handling value change
  },
  render: props => <SelectInputWithProvider {...props} />,
};
