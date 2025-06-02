import type { Meta, StoryObj } from "@storybook/react";

import { FormProvider, useForm } from "react-hook-form";
import { MUI_AUGMENTED_COLOR_OPTIONS_ARG_TYPES } from "../../consts/storybook";
import Switch, { SwitchProps } from "./Switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  argTypes: { ...MUI_AUGMENTED_COLOR_OPTIONS_ARG_TYPES },
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

const WrapperComponent = (props: SwitchProps) => {
  const methods = useForm<{ idvt: boolean }>({
    defaultValues: {
      idvt: false,
    },
  });

  return (
    <FormProvider {...methods}>
      <Switch {...methods.register("idvt")} {...props} />
    </FormProvider>
  );
};

export const Basic: Story = {
  args: {
    name: "Idvt",
    label: "IDVT required",
  },
  render: props => <WrapperComponent {...props} />,
};
