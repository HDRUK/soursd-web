import { Box, Card, CardProps, Typography } from "@mui/material";
import { ReactNode } from "react";
import Text from "../../components/Text";
import {
  CustodianProjectUser,
  ProjectUser,
  WithRoutes,
} from "../../types/application";
import {
  renderProjectUserNameCell,
  renderUserOrganisationsNameCell,
} from "../../utils/cells";

export type KanbanBoardUsersCardProps = CardProps &
  WithRoutes<{
    data: CustodianProjectUser;
    actions?: ReactNode;
  }>;

export default function KanbanBoardUsersCard({
  data,
  actions,
  sx,
  routes,
  ...restProps
}: KanbanBoardUsersCardProps) {
  const {
    project_has_user,
    project_has_user: { affiliation, project, role },
  } = data;

  return (
    <Card
      sx={{
        p: 2,
        "> *": {
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
          {renderProjectUserNameCell(project_has_user, routes.name.path)}
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
