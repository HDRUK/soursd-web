import type { Meta, StoryObj } from "@storybook/react";

import { Link } from "@mui/material";
import ActionsPanel from "../ActionsPanel";
import ActionsPanelValidationChecks from "./ActionsPanelValidationChecks";

const meta = {
  title: "components/ActionsPanelValidationChecks",
  component: ActionsPanelValidationChecks,
  tags: ["autodocs"],
} satisfies Meta<typeof ActionsPanelValidationChecks>;

export default meta;

type Story = StoryObj<typeof meta>;

const BasicStory = () => {
  return (
    <ActionsPanel heading="Validation checks">
      <ActionsPanelValidationChecks
        heading="Has all Network mandatory training and awareness been completed"
        history={[
          {
            heading: "Mike Doe (custodian), 2 days ago",
            description: "Here is that attachment",
            actions: <Link href="/">Attachment</Link>,
          },
          {
            heading: "Patrick Nash (User), 3 days ago",
            description: "Detail of the comment here",
            actions: <Link href="/">Attachment</Link>,
          },
          {
            heading: "John Smith (User), 4 days ago",
            description: "Detail of the comment here",
            actions: <Link href="/">Attachment</Link>,
          },
        ]}
      />
    </ActionsPanel>
  );
};

export const Basic: Story = {
  render: () => <BasicStory />,
  args: {},
};
