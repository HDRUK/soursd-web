import type { Meta, StoryObj } from "@storybook/react";

import UserStatus from ".";

const meta = {
  title: "components/UserStatus",
  component: UserStatus,
  tags: ["autodocs"],
} satisfies Meta<typeof UserStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    status: "invited",
  },
};
