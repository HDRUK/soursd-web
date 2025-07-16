import type { Meta, StoryObj } from "@storybook/react";

import { useTranslations } from "next-intl";
import ErrorMessage from ".";

const meta = {
  title: "components/ErrorMessage",
  component: ErrorMessage,
  tags: ["autodocs"],
} satisfies Meta<typeof ErrorMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

const StoryComponent = () => {
  const t = useTranslations("Profile");

  return <ErrorMessage t={t} tKey="postAffiliationError" />;
};

export const Basic: Story = {
  args: {},
  render: StoryComponent,
};
