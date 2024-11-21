import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import DateInput, { DateInputProps } from "./DateInput";

// Storybook metadata
export default {
  title: "Components/DateInput",
  component: DateInput,
  argTypes: {
    label: { control: "text", description: "The label for the date picker" },
    value: { control: "date", description: "The selected date" },
    onChange: {
      action: "onChange",
      description: "Callback when the date changes",
    },
  },
} as Meta<typeof DateInput>;

// Typing the Template function with StoryFn<DateInputProps>
const Template: StoryFn<typeof DateInput> = ({
  label,
  value,
  onChange,
}: DateInputProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);

  return (
    <DateInput
      label={label}
      value={selectedDate}
      onChange={date => {
        setSelectedDate(date);
        onChange(date);
      }}
    />
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  label: "Select a date",
  value: null,
};
