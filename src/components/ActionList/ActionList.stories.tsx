import type { Meta, StoryObj } from "@storybook/nextjs";

import { Edit } from "@mui/icons-material";
import ActionList from "./ActionList";
import ActionListItem from "./ActionListItem";

const meta = {
  title: "components/ActionList",
  component: ActionList,
  tags: ["autodocs"],
} satisfies Meta<typeof ActionList>;

export default meta;

type Story = StoryObj<typeof meta>;

const BasicStoryComponent = () => (
  <ActionList>
    <ActionListItem primaryText="ACCESS_GATEWAY" primaryAction={<Edit />} />
    <ActionListItem
      primaryText="ACCESS_COHORT_DISCOVERY"
      primaryAction={<Edit />}
    />
    <ActionListItem primaryText="ACCESS_WEBSITE" primaryAction={<Edit />} />
  </ActionList>
);

export const Basic: Story = {
  args: {},
  render: () => <BasicStoryComponent />,
};
