import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "@mui/material";
import { Message, MessageTitle, MessageContent } from ".";

const meta = {
  title: "components/Message",
  component: Message,
  decorators: [
    Story => (
      <Box px={2} minHeight="200px">
        <Story />
      </Box>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Message>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <MessageTitle>Title of message</MessageTitle>
        <MessageContent>
          Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet
        </MessageContent>
      </>
    ),
  },
};
