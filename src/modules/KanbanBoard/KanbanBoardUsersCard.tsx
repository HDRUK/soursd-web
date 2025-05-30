import { ProjectAllUser } from "../../types/application";
import { renderUserNameCell } from "../../utils/cells";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Box, Card, CardProps, Typography } from "@mui/material";
import { ReactNode } from "react";
import Text from "../../components/Text";

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
  const { organisation_name, project_id, project_name, project_role } = data;

  return (
    <Card
      sx={{
        p: 2,
        ...sx,
      }}
      {...restProps}>
      <Text
        endIcon={<Box onMouseDown={e => e.stopPropagation()}>{actions}</Box>}
        variant="h6"
        sx={{
          color: "menuList1.main",
          mb: 1,
        }}>
        <Box sx={{ flexGrow: 1 }}>{renderUserNameCell(data)}</Box>
      </Text>
      <Typography color="success.main">{organisation_name}</Typography>
      <Typography sx={{ whiteSpace: "normal" }}>
        {project_name} (id: {project_id})
      </Typography>
      <Typography>{project_role}</Typography>
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
