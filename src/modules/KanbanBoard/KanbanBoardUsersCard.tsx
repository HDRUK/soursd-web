import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Box, Card, CardProps, Typography } from "@mui/material";
import { ReactNode } from "react";
import Text from "../../components/Text";
import { ProjectAllUser } from "../../types/application";
import { renderUserNameCell } from "../../utils/cells";

export interface KanbanBoardUsersCardProps extends CardProps {
  data: ProjectAllUser;
  actions?: ReactNode;
}

export default function KanbanBoardUsersCard({
  data,
  actions,
  sx,
  ...restProps
}: KanbanBoardUsersCardProps) {
  const { affiliation, project, role, registry } = data;

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
        endIcon={<Box onMouseDown={e => e.stopPropagation()}>{actions}</Box>}
        variant="h6"
        sx={{
          color: "menuList1.main",
          mb: 1,
          fontSize: "1rem",
        }}>
        <Box sx={{ flexGrow: 1 }}>{renderUserNameCell(registry.user)}</Box>
      </Text>
      <Typography color="success.main">
        {affiliation.organisation.organisation_name}
      </Typography>
      <Typography>
        {project.title} (id: {project.id})
      </Typography>
      <Typography>{role.name}</Typography>
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
    </Card>
  );
}
