import type { Meta, StoryObj } from "@storybook/react";

import SettingsIcon from "@mui/icons-material/Settings";
import ActionsPanelItem from "../ActionsPanelItem";
import ActionsPanel from "./ActionsPanel";
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const meta = {
  title: "components/ActionsPanel",
  component: ActionsPanel,
  tags: ["autodocs"],
} satisfies Meta<typeof ActionsPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    heading: "Oustanding actions",
    children: (
      <>
        <ActionsPanelItem
          icon={<SettingsIcon />}
          heading="Complete your configuration"
          description="This is where we need you to setup things lke IDV technology and the decision models..."
          action={<Button>Get started</Button>}
        />
        <ActionsPanelItem
          icon={<PersonIcon />}
          heading="Add your contacts"
          description="As well as yourself, it’s a good idea to set up your colleagues who will help administer the system and approve users, projects and organisations"
          action={<Button variant="outlined">Add contacts</Button>}
        />
      </>
    ),
  },
};
