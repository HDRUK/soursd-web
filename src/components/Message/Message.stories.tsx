import type { Meta, StoryObj } from "@storybook/react";

import { Box, Button } from "@mui/material";
import { useState } from "react";
import { Message, MessageProps, MessageTitle } from ".";
import MessageContent from "./MessageContent";

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

const ClosableMessage = ({
  children,
  ...restProps
}: Omit<MessageProps, "open">) => {
  const [open, setOpen] = useState(true);

  return open ? (
    <Message open={open} {...restProps} onClose={() => setOpen(false)}>
      {children}
    </Message>
  ) : (
    <Button onClick={() => setOpen(true)}>Open</Button>
  );
};

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

export const Closable: Story = {
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
  render: props => <ClosableMessage {...props} />,
};
