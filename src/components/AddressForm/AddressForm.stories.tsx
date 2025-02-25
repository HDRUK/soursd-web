import type { Meta, StoryObj } from "@storybook/react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AddressForm, { AddressFormProps } from "./AddressForm";

const meta = {
  title: "components/AddressForm",
  component: AddressForm,
  tags: ["autodocs"],
} satisfies Meta<typeof AddressForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const schema = yup.object().shape({
    address: yup.object().shape({
      address_1: yup.string().required("address1RequiredInvalid"),
      address_2: yup.string().nullable(),
      town: yup.string().required("townRequiredInvalid"),
      county: yup.string().nullable(),
      country: yup.string().nullable(),
      postcode: yup.string().required("postcodeRequiredInvalid"),
    }),
  });

  const formOptions = {
    defaultValues: {
      address: {
        address_1: "",
        address_2: "",
        town: "",
        county: "",
        country: "United Kingdom",
        postcode: "",
      },
    },
    resolver: yupResolver(schema),
  };

  const methods = useForm(formOptions);
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
