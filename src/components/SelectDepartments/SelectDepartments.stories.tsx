import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { mockedOrganisation } from "@/mocks/data/organisation";
import { useForm, FormProvider } from "react-hook-form";
import SelectDepartments, { SelectDepartmentsProps } from "./SelectDepartments";

const meta = {
  title: "components/SelectDepartments",
  component: SelectDepartments,
  tags: ["autodocs"],
} satisfies Meta<typeof SelectDepartments>;

export default meta;

type Story = StoryObj<typeof meta>;

const SelectDepartmentsWithProvider = (props: SelectDepartmentsProps) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <SelectDepartments {...props} />
    </FormProvider>
  );
};

const mockOrganisation = mockedOrganisation();

export const Basic: Story = {
  args: {
    organisation: mockOrganisation,
    value: mockOrganisation.departments[0].id,
    onChange: event => console.log(event.target.value),
  },
  render: props => <SelectDepartmentsWithProvider {...props} />,
};
