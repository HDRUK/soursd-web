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
          action={<Button>Get started</Button>}
        />
        <ActionsPanelItem
          icon={<PersonIcon />}
          heading="Add your contacts"
          action={<Button variant="outlined">Add contacts</Button>}
        />
      </>
    ),
  },
};
