import type { Meta, StoryObj } from "@storybook/react";

import UserRegisteredStatus from ".";

const meta = {
  title: "components/UserRegisteredStatus",
  component: UserRegisteredStatus,
  tags: ["autodocs"],
} satisfies Meta<typeof UserRegisteredStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    registered: true,
  },
};
