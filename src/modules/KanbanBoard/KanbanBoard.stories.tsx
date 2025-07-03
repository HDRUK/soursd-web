import type { Meta, StoryObj } from "@storybook/react";

import {
  mockedKanbanCustodianProjectUsers,
  mockedProjectStateWorkflow,
} from "@/mocks/data/project";
import { CustodianProjectUser } from "@/types/application";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { ActionMenu } from "@/components/ActionMenu";
import KanbanBoard, { KanbanBoardProps } from "./KanbanBoard";
import KanbanBoardUsersCard, {
  KanbanBoardUsersCardProps,
} from "./KanbanBoardUsersCard";

const meta = {
  title: "modules/KanbanBoard",
  component: KanbanBoard,
  tags: ["autodocs"],
} satisfies Meta<typeof KanbanBoard>;

export default meta;

type Story = StoryObj<typeof meta>;

const WrappingComponent = (props: KanbanBoardProps<CustodianProjectUser>) => {
  const cardComponent = useCallback((props: KanbanBoardUsersCardProps) => {
    return (
      <KanbanBoardUsersCard
        {...props}
        routes={{
          name: {
            path: "/",
          },
        }}
      />
    );
  }, []);

  const t = useTranslations("Projects.Users");
  return (
    <KanbanBoard
      {...props}
      t={t}
      cardComponent={cardComponent}
      cardActionsComponent={() => <ActionMenu />}
    />
  );
};

export const Draggable: Story = {
  args: {
    initialData: mockedKanbanCustodianProjectUsers(),
    stateWorkflow: mockedProjectStateWorkflow(),
    strategy: rectSortingStrategy,
    queryState: {
      isError: false,
      isLoading: false,
      isSuccess: true,
    },
  },
  render: props => {
    return <WrappingComponent {...props} />;
  },
};
