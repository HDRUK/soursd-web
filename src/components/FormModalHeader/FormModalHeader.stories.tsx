import type { Meta, StoryObj } from "@storybook/react";

import PersonIcon from "@mui/icons-material/Person";
import FormModalHeader from "./FormModalHeader";

const meta = {
  title: "components/FormModalHeader",
  component: FormModalHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof FormModalHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: "Form modal header here",
    icon: <PersonIcon />,
  },
};
