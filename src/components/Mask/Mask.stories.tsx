import type { Meta, StoryObj } from "@storybook/nextjs";

import Mask from ".";

const meta = {
  title: "components/Mask",
  component: Mask,
  tags: ["autodocs"],
} satisfies Meta<typeof Mask>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: <img src="/profile.picture.png" alt="Profile" />,
  },
};
