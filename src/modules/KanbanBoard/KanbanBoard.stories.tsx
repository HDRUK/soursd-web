import type { Meta, StoryObj } from "@storybook/react";

import {
  mockedKanbanProjectUser,
  mockedProjectStateWorkflow,
} from "@/mocks/data/project";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import KanbanBoard from "./KanbanBoard";
import KanbanBoardUsersCard from "./KanbanBoardUsersCard";

const meta = {
  title: "modules/KanbanBoard",
  component: KanbanBoard,
  tags: ["autodocs"],
} satisfies Meta<typeof KanbanBoard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Draggable: Story = {
  args: {
    cardComponent: KanbanBoardUsersCard,
    initialData: mockedKanbanProjectUser(),
    stateWorkflow: mockedProjectStateWorkflow(),
    strategy: rectSortingStrategy,
  },
  render: props => {
    return <KanbanBoard {...props} />;
  },
};
