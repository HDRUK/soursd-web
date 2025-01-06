import type { Meta, StoryObj } from "@storybook/react";

import { TextField } from "@mui/material";
import FormField, { FormFieldProps } from ".";
import Form from "../Form";

const meta = {
  title: "components/FormField",
  component: FormField,
  tags: ["autodocs"],
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

const FormFieldWithProvider = (props: FormFieldProps) => {
  return <Form>{() => <FormField component={TextField} {...props} />}</Form>;
};

export const Basic: Story = {
  args: {
    name: "email",
  },
  render: props => <FormFieldWithProvider {...props} />,
};
