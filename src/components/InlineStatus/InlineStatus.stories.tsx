import type { Meta, StoryObj } from "@storybook/react";

import { CircularProgress, Typography } from "@mui/material";
import InlineStatus from ".";

const meta = {
  title: "components/InlineStatus",
  component: InlineStatus,
  tags: ["autodocs"],
} satisfies Meta<typeof InlineStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <Typography>I am loading</Typography>
        <CircularProgress size="1em" />
      </>
    ),
  },
};
