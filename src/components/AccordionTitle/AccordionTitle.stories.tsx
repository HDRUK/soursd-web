import type { Meta, StoryObj } from "@storybook/react";

import BusinessIcon from "@mui/icons-material/Business";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Link,
} from "@mui/material";
import ActionMenu from "../ActionMenu";
import AccordionTitle, { AccordionTitleProps } from "./AccordionTitle";

const meta = {
  title: "components/AccordionTitle",
  component: AccordionTitle,
  tags: ["autodocs"],
} satisfies Meta<typeof AccordionTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

const BasicStoryComponent = (props: AccordionTitleProps) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <AccordionTitle {...props} />
    </AccordionSummary>
    <AccordionDetails>Content</AccordionDetails>
  </Accordion>
);

export const Basic: Story = {
  args: {
    icon: [<BusinessIcon />],
    children: "Orgnisation 1",
    actions: <ActionMenu items={[<Link>Permissions</Link>]} />,
  },
  render: props => <BasicStoryComponent {...props} />,
};
