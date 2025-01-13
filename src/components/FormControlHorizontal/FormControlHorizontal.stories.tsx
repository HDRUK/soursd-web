import type { Meta, StoryObj } from "@storybook/react";

import { TextField } from "@mui/material";
import FormControlHorizontal, { FormControlHorizontalProps } from ".";
import Form from "../Form";
import FormField from "../FormField";

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
      {({ formState: { errors } }) => (
        <FormControlHorizontal id="name" error={errors.name} {...props} />
      )}
    </Form>
  );
};

export const Basic: Story = {
  args: {
    label: "Email",
    id: "email",
    renderField: fieldProps => (
      <FormField component={TextField} {...fieldProps} />
    ),
  },
  render: props => <FormControlHorizontalProvider {...props} />,
};
