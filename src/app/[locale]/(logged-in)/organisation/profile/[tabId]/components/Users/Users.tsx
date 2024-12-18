import ApplicationLink from "@/components/ApplicationLink";
import Icon from "@/components/Icon";
import Results from "@/components/Results";
import ResultsCard from "@/components/ResultsCard";
import UserRegisteredStatus from "@/components/UserRegisteredStatus";
import { DecoupleIcon } from "@/consts/icons";
import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import { getUsers } from "@/services/users";
import { formatShortDate } from "@/utils/date";
import { isRegistered } from "@/utils/user";
import { Search } from "@mui/icons-material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import UserModal from "../UserModal";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export default function Users() {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const [open, setOpen] = useState(false);
  const organisation = useStore(state => state.config.organisation);

  const {
    isError: isGetUsersError,
    isLoading: isGetUsersLoading,
    data: usersData,
  } = useQuery({
    queryKey: ["getUsers", organisation?.id],
    queryFn: () => getUsers(),
  });

  return (
    <PageGuidance
      title={t("manageUsers")}
      {...mockedPersonalDetailsGuidanceProps}>
      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        <Box component="form" role="search" sx={{ flexGrow: 1 }}>
          <TextField
            fullWidth
            hiddenLabel
            label="Search"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton aria-label={t("searchOrganisationUsers")}>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          endIcon={<AddCircleOutlineOutlinedIcon />}
          variant="contained"
          onClick={() => setOpen(true)}>
          {t("inviteNewUserButton")}
        </Button>
      </Box>

      <Results
        noResultsMessage={t("noResults")}
        errorMessage={t.rich("getError", {
          applicationLink: ApplicationLink,
        })}
        queryState={{
          isLoading: isGetUsersLoading,
          isError: isGetUsersError,
        }}>
        {usersData?.data?.data.map(user => {
          const { first_name, last_name, created_at, email } = user;

          return (
            <ResultsCard
              icon={
                <Icon size="xlarge">
                  <PersonOutlineOutlinedIcon />
                </Icon>
              }
              content={
                <>
                  <Typography variant="h6">
                    {first_name} {last_name}
                  </Typography>
                  <Typography>{email}</Typography>
                </>
              }
              details={
                <>
                  <Typography color="caption.main">
                    {t("invitedOn", {
                      date: formatShortDate(created_at),
                    })}
                  </Typography>
                  <UserRegisteredStatus registered={isRegistered(user)} />
                </>
              }
              actions={
                <IconButton size="small">
                  <DecoupleIcon />
                </IconButton>
              }
            />
          );
        })}
      </Results>
      {!!organisation && (
        <UserModal
          organisation={organisation}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </PageGuidance>
  );
}
