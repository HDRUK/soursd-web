import Postit from "@/components/Postit";
import SoursdLogo from "@/components/SoursdLogo";
import Text from "@/components/Text";
import { useStore } from "@/data/store";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function UserInfo() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const user = useStore(state => state.getUser());
  const theme = useTheme();

  return (
    <Postit sx={{ mx: "auto", mb: 7 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {tProfile("details")}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Text startIcon={<PersonIcon />}>
          {user?.first_name} {user?.last_name}
        </Text>
        <Text startIcon={<MailIcon />}>{user?.email}</Text>
      </Box>
      <Text
        startIcon={<SoursdLogo size={16} />}
        sx={{
          fontSize: theme.typography.h4.fontSize,
          fontWeight: 500,
          justifyContent: "center",
          mb: 1,
        }}>
        {user?.registry.digi_ident}
      </Text>
      <Typography>
        This ‘key’ represents you as a user within SOURSD. This is unique to
        you! Any time SOURSD sends information to you, or activates a callback,
        this identifier will be sent along with the payload. Meaning you can
        always trust the source of information.
      </Typography>
    </Postit>
  );
}
