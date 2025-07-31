import type { Meta, StoryObj } from "@storybook/react";
import DeleteIcon from "@mui/icons-material/Delete";

import IconAction from ".";

const meta = {
  title: "components/IconAction",
  component: IconAction,
  tags: ["autodocs"],
} satisfies Meta<typeof IconAction>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    loading: false,
    disabled: false,
    children: <DeleteIcon />,
  },
};
