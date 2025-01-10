import type { Meta, StoryObj } from "@storybook/react";
import InfoBox from "./InfoBox";

const meta = {
  title: "components/InfoBox",
  component: InfoBox,
  tags: ["autodocs"],
} satisfies Meta<typeof InfoBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    index: 1,
    children: "This is a basic InfoBox",
  },
};

export const WithLongContent: Story = {
  args: {
    index: 1,
    children:
      "This InfoBox contains a longer piece of content to demonstrate its behavior with varying text sizes.",
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
          <InfoBox index={i + 1}>
            InfoBox ${i + 1} with dynamic content.
          </InfoBox>
        ))}
      </div>
    </div>
  ),
};
