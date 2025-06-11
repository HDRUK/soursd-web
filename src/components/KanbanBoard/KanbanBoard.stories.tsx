import type { Meta, StoryObj } from "@storybook/react";

import { mockedProjectUser } from "@/mocks/data/custodian";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import KanbanBoard from "./KanbanBoard";
import KanbanBoardUsersCard from "./KanbanBoardUsersCard";

const meta = {
  title: "components/KanbanBoard",
  component: KanbanBoard,
  tags: ["autodocs"],
} satisfies Meta<typeof KanbanBoard>;

export default meta;

type Story = StoryObj<typeof meta>;

const formReceived = [mockedProjectUser({ id: 1 })];

const validationInProgressData = [
  mockedProjectUser({ id: 2, first_name: "Chevy", last_name: "Chase" }),
  mockedProjectUser({ id: 3, first_name: "Sigourney", last_name: "Weaver" }),
  mockedProjectUser({ id: 4, first_name: "John", last_name: "Smith" }),
  mockedProjectUser({ id: 5, first_name: "Will", last_name: "Weaton" }),
];

const validationComplete = [
  mockedProjectUser({ id: 6, first_name: "Alexander", last_name: "Siddig" }),
];

const infoRequested = [
  mockedProjectUser({ id: 7, first_name: "Colm", last_name: "Meaney" }),
];

const escalation = [
  mockedProjectUser({ id: 8, first_name: "Michael", last_name: "Dorn" }),
];

const validated = [
  mockedProjectUser({ id: 9, first_name: "Marina", last_name: "Sirtis" }),
];

const initialData = {
  "Form Received": formReceived,
  "Validation In Progress": validationInProgressData,
  "Validation Complete": validationComplete,
  "More User Information Requested": infoRequested,
  "Escalation to Validation Committee": escalation,
  Validated: validated,
};

export const Draggable: Story = {
  args: {
    cardComponent: KanbanBoardUsersCard,
    initialData,
    strategy: rectSortingStrategy,
  },
  render: props => {
    return <KanbanBoard {...props} />;
  },
};
