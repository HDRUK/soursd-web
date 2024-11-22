import type { Meta, StoryObj } from "@storybook/react";

import { FormProvider, useForm } from "react-hook-form";
import FormControlHorizontal, { FormControlHorizontalProps } from ".";
import { TextField } from "@mui/material";

const meta = {
  title: "components/FormControlHorizontal",
  component: FormControlHorizontal,
  tags: ["autodocs"],
} satisfies Meta<typeof FormControlHorizontal>;

export default meta;

type Story = StoryObj<typeof meta>;

const FormControlHorizontalProvider = (props: FormControlHorizontalProps) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <FormControlHorizontal {...props}>
        <TextField id="email" />
      </FormControlHorizontal>
    </FormProvider>
  );
};

export const Basic: Story = {
  args: {
    label: "Email",
    id: "email",
  },
  render: props => <FormControlHorizontalProvider {...props} />,
};
