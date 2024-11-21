import type { Meta, StoryObj } from "@storybook/react";

import { mockedIssuerIdvtInfoContent } from "@/mocks/data/cms";
import { Switch } from "@mui/material";
import InformationSection from ".";

const meta = {
  title: "components/InformationSection",
  component: InformationSection,
  tags: ["autodocs"],
} satisfies Meta<typeof InformationSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    heading: (
      <>
        Do you require identification validation?
        <Switch color="success" />
      </>
    ),
    description:
      "This is handled by a third party Identification Document Verification Technology (IDVT)",
    children: mockedIssuerIdvtInfoContent,
  },
};
