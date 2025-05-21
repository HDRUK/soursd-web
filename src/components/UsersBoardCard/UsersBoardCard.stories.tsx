import type { Meta, StoryObj } from "@storybook/react";

import { mockedProjectUser } from "@/mocks/data/custodian";
import { renderUserNameCell } from "@/utils/cells";
import { Grid, Typography } from "@mui/material";
import UserBoardCard from ".";
import UsersBoard from "../UsersBoard";
import UsersBoardColumn from "../UsersBoardColumn";
import Text from "../Text";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const meta = {
  title: "components/UserBoardCard",
  component: UserBoardCard,
  tags: ["autodocs"],
} satisfies Meta<typeof UserBoardCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const newIssuesList = [mockedProjectUser({ id: 1 })];

const openIssuesList = [
  mockedProjectUser({ id: 2 }),
  mockedProjectUser({ id: 3 }),
  mockedProjectUser({ id: 4 }),
  mockedProjectUser({ id: 5 }),
];

const initialData = {
  new: newIssuesList,
  open: openIssuesList,
};

export const Draggable: Story = {
  args: {
    children: [],
  },
  render: props => {
    return (
      <UsersBoard initialData={initialData}>
        {state => {
          const gridWidth = 12 / Object.keys(initialData).length;

          return (
            <Grid container columnSpacing={2}>
              {Object.keys(state).map((key: string) => {
                return (
                  <Grid item xs={gridWidth}>
                    <UsersBoardColumn
                      id={key}
                      heading={`Form Received (${state[key].length})`}>
                      {state[key].map(data => {
                        console.log("DATA", data);
                        return (
                          <UserBoardCard key={data.id} id={data.id} data={data}>
                            <Typography
                              variant="h6"
                              sx={{
                                color: "menuList1.main",
                                mb: 1,
                              }}>
                              {renderUserNameCell(data)}
                            </Typography>
                            <Typography color="success.main">
                              {data.organisation_name}
                            </Typography>
                            <Typography>
                              {data.project_name} (id: {data.project_id})
                            </Typography>
                            <Typography>{data.project_role}</Typography>
                            <Text
                              startIcon={
                                <PersonOutlineIcon
                                  sx={{
                                    color: "success.main",
                                  }}
                                />
                              }>
                              Project & SDE
                            </Text>
                          </UserBoardCard>
                        );
                      })}
                    </UsersBoardColumn>
                  </Grid>
                );
              })}
            </Grid>
          );
        }}
      </UsersBoard>
    );
  },
};
