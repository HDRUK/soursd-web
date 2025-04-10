import type { Meta, StoryObj } from "@storybook/react";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Icon from ".";

const meta = {
  title: "components/Icon",
  component: Icon,
  tags: ["autodocs"],
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: <PersonOutlineOutlinedIcon />,
  },
};
