import type { Meta, StoryObj } from "@storybook/react";
import ListInfoItem from "./ListInfoItem";

const meta = {
  title: "components/ListInfoItem",
  component: ListInfoItem,
  tags: ["autodocs"],
} satisfies Meta<typeof ListInfoItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    index: 1,
    children: "This is a basic ListInfoItem",
  },
};

export const WithLongContent: Story = {
  args: {
    index: 1,
    children:
      "This ListInfoItem contains a longer piece of content to demonstrate its behavior with varying text sizes.",
  },
};

export const UserGroup: Story = {
  args: {
    index: 1,
    children: "Placeholder content",
  },
  render: () => (
    <div>
      <div style={{ marginTop: "16px" }}>
        {[...Array(3)].map((_, i) => (
          <ListInfoItem index={i + 1}>
            ListInfoItem ${i + 1} with dynamic content.
          </ListInfoItem>
        ))}
      </div>
    </div>
  ),
};
