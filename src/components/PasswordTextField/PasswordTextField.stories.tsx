import type { Meta, StoryObj } from "@storybook/nextjs";

import { FormProvider, useForm } from "react-hook-form";
import PasswordTextField, { PasswordTextFieldProps } from ".";

const meta = {
  title: "components/PasswordTextField",
  component: PasswordTextField,
  tags: ["autodocs"],
} satisfies Meta<typeof PasswordTextField>;

export default meta;

type Story = StoryObj<typeof meta>;

const PasswordTextFieldWithProvider = (props: PasswordTextFieldProps) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <PasswordTextField
        label="Password"
        aria-label="Password"
        placeholder="Password"
        {...props}
      />
    </FormProvider>
  );
};

export const Basic: Story = {
  args: {
    iconButtonProps: { "aria-label": "password" },
    id: "password",
    size: "small",
  },
  render: props => <PasswordTextFieldWithProvider {...props} />,
};
