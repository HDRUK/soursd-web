import { Box, BoxProps, Link, Typography } from "@mui/material";
import { getInitials } from "@/utils/application";
import { User } from "@/types/application";
import MaskLabel from "../MaskLabel";

export interface UserDetailsProps extends BoxProps {
  user: User;
}

export default function UserDetails({ user, ...restProps }: UserDetailsProps) {
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
        <Link href={`mailto:${user?.email}`} sx={{ wordBreak: "break-all" }}>
          {user?.email}
        </Link>
      </Box>
    </Box>
  );
}
