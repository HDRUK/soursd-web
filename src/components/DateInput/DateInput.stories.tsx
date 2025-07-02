import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import DateInput, { DateInputProps } from "./DateInput";

const meta = {
  title: "components/DateInput",
  component: DateInput,
  tags: ["autodocs"],
} satisfies Meta<typeof DateInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const DateInputWithState = ({ value, ...props }: DateInputProps) => {
  return <DateInput {...props} value={value} />;
};

export const Default: Story = {
  args: {
    label: "Select a date",
    value: undefined,
    onChange: (date: Date | null) => {
      console.log("Date changed:", date);
    },
  },
  render: props => <DateInputWithState {...props} />,
};
