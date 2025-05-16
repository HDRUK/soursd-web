import type { Meta, StoryObj } from "@storybook/react";

import { MUI_AUGMENTED_COLOR_OPTIONS_ARG_TYPES } from "../../consts/storybook";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ScreenArrow from ".";
import { ScreenArrowProps } from "./ScreenArrow";

const meta = {
  title: "components/ScreenArrow",
  component: ScreenArrow,
  argTypes: { ...MUI_AUGMENTED_COLOR_OPTIONS_ARG_TYPES },
  tags: ["autodocs"],
} satisfies Meta<typeof ScreenArrow>;

export default meta;

type Story = StoryObj<typeof meta>;

const PositionsLayout = (props: ScreenArrowProps) => {
  return (
    <>
      <ScreenArrow {...props} alignment="top">
        Top <ExpandLessIcon />
      </ScreenArrow>
      <ScreenArrow {...props} alignment="bottom">
        Bottom <ExpandMoreIcon />
      </ScreenArrow>
      <ScreenArrow {...props} alignment="left">
        Left <ExpandMoreIcon />
      </ScreenArrow>
      <ScreenArrow {...props} alignment="right">
        Right <ExpandMoreIcon />
      </ScreenArrow>
    </>
  );
};

export const Positions: Story = {
  args: {
    children: "",
  },
  render: props => <PositionsLayout {...props} />,
};
