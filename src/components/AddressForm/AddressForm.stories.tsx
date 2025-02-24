import type { Meta, StoryObj } from "@storybook/react";
import { useForm, FormProvider } from "react-hook-form";
import AddressForm, { AddressFormProps } from "./AddressForm";

const meta = {
  title: "components/AddressForm",
  component: AddressForm,
  tags: ["autodocs"],
} satisfies Meta<typeof AddressForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export const Basic: Story = {
  render: args => (
    <FormWrapper>
      <AddressForm {...args} />
    </FormWrapper>
  ),
  args: {
    name: "address",
  } as AddressFormProps,
};
