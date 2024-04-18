import type { Meta, StoryObj } from "@storybook/react";

import { Box, OutlinedInput } from "@mui/material";
import { MessageInline, MessageInlineProps } from ".";

const meta = {
  title: "components/MessageInline",
  component: MessageInline,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MessageInline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children:
      "Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet",
  },
  render: ({ children, ...restProps }: MessageInlineProps) => {
    return (
      <Box display="flex" gap={1}>
        <OutlinedInput size="small" />
        <MessageInline {...restProps}>{children}</MessageInline>
      </Box>
    );
  },
};
