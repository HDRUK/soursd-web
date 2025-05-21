import type { Meta, StoryObj } from "@storybook/react";

import {
  ApprovedIcon,
  ApprovedTrainingIcon,
  ApprovedUserIcon,
  IdentityVerifiedIcon,
  PendingIcon,
} from "../../consts/icons";
import Legend from ".";

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
