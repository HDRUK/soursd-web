import type { Meta, StoryObj } from "@storybook/react";

import Legend from ".";
import {
  IdentityVerifiedIcon,
  ApprovedUserIcon,
  ApprovedTrainingIcon,
  ApprovedIcon,
  PendingIcon,
} from "@/consts/icons";

const meta = {
  title: "components/Legend",
  component: Legend,
  tags: ["autodocs"],
} satisfies Meta<typeof Legend>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    items: [
      {
        text: "Identity Verified",
        icon: <IdentityVerifiedIcon />,
      },
      {
        text: "Approved User",
        icon: <ApprovedUserIcon />,
      },
      {
        text: "Approved Training",
        icon: <ApprovedTrainingIcon />,
      },
      {
        text: "Approved Organisation",
        icon: <ApprovedIcon />,
      },
      {
        text: "Pending Organisation",
        icon: <PendingIcon />,
      },
    ],
  },
};
