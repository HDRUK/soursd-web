import { Box, Card, CardProps, Typography } from "@mui/material";
import { ReactNode } from "react";
import Text from "../../components/Text";
import { ProjectUser, WithRoutes } from "../../types/application";
import {
  renderProjectUserNameCell,
  renderUserOrganisationsNameCell,
} from "../../utils/cells";

export type KanbanBoardUsersCardProps = CardProps &
  WithRoutes<{
    data: ProjectUser;
    actions?: ReactNode;
  }>;

export default function KanbanBoardUsersCard({
  data,
  actions,
  sx,
  routes,
  ...restProps
}: KanbanBoardUsersCardProps) {
  const { affiliation, project, role } = data;

  return (
    <Card
      sx={{
        p: 2,
        "> p": {
          fontSize: "0.875rem",
          whiteSpace: "normal",
        },
        ...sx,
      }}
      {...restProps}>
      <Text
        onMouseDown={e => e.stopPropagation()}
        endIcon={actions}
        variant="h6"
        sx={{
          color: "menuList1.main",
          mb: 1,
          fontSize: "1rem",
        }}>
        <Box sx={{ flexGrow: 1 }}>
          {renderProjectUserNameCell(data, routes.name.path)}
        </Box>
      </Text>
      <Typography color="success.main">
        {renderUserOrganisationsNameCell(affiliation?.organisation)}
      </Typography>
      <Typography>
        {project.title} (id: {project.id})
      </Typography>
      <Typography>{role?.name}</Typography>
    </Card>
  );
}
