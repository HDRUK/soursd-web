import { Box, BoxProps, Link, Typography } from "@mui/material";
import { getInitials } from "../../utils/application";
import { ProjectUser } from "../../types/application";
import MaskLabel from "../MaskLabel";

export interface ProjectUserDetailsProps extends BoxProps {
  projectUser: ProjectUser;
}

export default function ProjectUserDetails({
  projectUser,
  ...restProps
}: ProjectUserDetailsProps) {
  const { registry, affiliation, role } = projectUser;
  const { user } = registry;
  const { organisation } = affiliation;

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      sx={{ pb: 2, gap: 3 }}
      {...restProps}>
      <MaskLabel
        initials={getInitials(`${user?.first_name} ${user?.last_name}`)}
        size="large"
        sx={{
          justifyContent: "flex-start",
          flexGrow: 0,
          display: { xs: "none", sm: "inline-flex" },
        }}
      />
      <Box display="flex" flexDirection="column">
        <Typography variant="h2" sx={{ flexWrap: 1 }}>
          {user?.first_name} {user?.last_name}
        </Typography>
        <Typography sx={{ flexWrap: 1 }}>{role.name}</Typography>
        <Typography sx={{ flexWrap: 1 }}>
          {organisation?.organisation_name}
        </Typography>
        <Link href={`mailto:${user?.email}`} sx={{ wordBreak: "break-all" }}>
          {user?.email}
        </Link>
      </Box>
    </Box>
  );
}
