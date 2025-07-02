import type { Meta, StoryObj } from "@storybook/nextjs";

import ApprovalStatus from ".";

const meta = {
  title: "components/ApprovalStatus",
  component: ApprovalStatus,
  tags: ["autodocs"],
} satisfies Meta<typeof ApprovalStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    isApproved: false,
    children: "john.smith@hdruk.ac.uk",
  },
};
