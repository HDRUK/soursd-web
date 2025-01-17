import type { Meta, StoryObj } from "@storybook/react";

import { TextField } from "@mui/material";
import FormControlHorizontal, { FormControlHorizontalProps } from ".";
import Form from "../Form";

const meta = {
  title: "components/FormControlHorizontal",
  component: FormControlHorizontal,
  tags: ["autodocs"],
} satisfies Meta<typeof FormControlHorizontal>;

export default meta;

type Story = StoryObj<typeof meta>;

const FormControlHorizontalProvider = (props: FormControlHorizontalProps) => {
  return (
    <Form defaultValues={{ name: "" }}>
      <FormControlHorizontal {...props} />
    </Form>
  );
};

export const Basic: Story = {
  args: {
    label: "Email",
    name: "email",
    renderField: fieldProps => <TextField {...fieldProps} />,
  },
  render: props => <FormControlHorizontalProvider {...props} />,
};
