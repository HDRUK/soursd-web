import { ProjectAllUser } from "@/types/application";
import { renderUserNameCell } from "@/utils/cells";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Card, CardProps, Typography } from "@mui/material";
import Text from "../Text";

export interface UsersBoardCardProps extends CardProps {
  user: ProjectAllUser;
}

export default function UsersBoardCard({
  user,
  sx,
  ...restProps
}: UsersBoardCardProps) {
  const { organisation_name, project_id, project_name, project_role } = user;

  return (
    <Card
      sx={{
        p: 2,
        ...sx,
      }}
      {...restProps}>
      <Typography
        variant="h6"
        sx={{
          color: "menuList1.main",
          mb: 1,
        }}>
        {renderUserNameCell(user)}
      </Typography>
      <Typography color="success.main">{organisation_name}</Typography>
      <Typography sx={{ wordBreak: "break-word" }}>
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
