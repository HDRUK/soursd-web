import type { Meta, StoryObj } from "@storybook/react";

import { Box, Button } from "@mui/material";
import { useState } from "react";
import { Message, MessageProps } from ".";

const meta = {
  title: "components/Message",
  component: Message,
  parameters: {
    layout: "centered",
  },
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

const ClosableRequestError = (props: Omit<MessageProps, "open">) => {
  const [open, setOpen] = useState(true);

  return open ? (
    <Message open={open} {...props} onClose={() => setOpen(false)} />
  ) : (
    <Button onClick={() => setOpen(true)}>Open</Button>
  );
};

export const Basic: Story = {
  args: {
    heading: "Title of message",
    description:
      "Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet",
  },
};

export const Closable: Story = {
  args: {
    heading: "Title of message",
    description:
      "Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet",
  },
  render: props => <ClosableRequestError {...props} />,
};
