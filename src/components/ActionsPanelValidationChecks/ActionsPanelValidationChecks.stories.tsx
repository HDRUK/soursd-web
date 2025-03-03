import type { Meta, StoryObj } from "@storybook/react";

import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button, Link } from "@mui/material";
import ActionsPanelValidationChecks from "./ActionsPanelValidationChecks";
import ActionsPanel from "../ActionsPanel";

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
            actions: <Link href="#">Attachment</Link>,
          },
          {
            heading: "Patrick Nash (User), 3 days ago",
            description: "Detail of the comment here",
            actions: <Link href="#">Attachment</Link>,
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
