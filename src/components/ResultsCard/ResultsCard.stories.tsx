import type { Meta, StoryObj } from "@storybook/react";

import Icon from "@/components/Icon";
import { DecoupleIcon } from "@/consts/icons";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Typography } from "@mui/material";
import ResultsCard from ".";
import IconButton from "../IconButton";

const meta = {
  title: "components/ResultsCard",
  component: ResultsCard,
  tags: ["autodocs"],
} satisfies Meta<typeof ResultsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    icon: (
      <Icon size="xlarge">
        <PersonOutlineOutlinedIcon />
      </Icon>
    ),
    content: (
      <>
        <Typography variant="h6">User name</Typography>
        <Typography color="caption.main">Description</Typography>
      </>
    ),
    details: <Typography>Last logged in: 12/12/2024</Typography>,
    actions: (
      <IconButton>
        <DecoupleIcon />
      </IconButton>
    ),
  },
};
