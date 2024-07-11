import type { Meta, StoryObj } from "@storybook/react";

import { Link } from "@mui/material";
import ActionMenu from "./ActionMenu";

const meta = {
  title: "components/ActionMenu",
  component: ActionMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof ActionMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    items: [<Link href="./">Permissions</Link>],
  },
};
