"use client";

import { mockedManageDelegatesGuidance } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import DelegatesForm, { DelegatesFormValues } from "./DelegatesForm";
import { patchOrganisation, PatchOrganisationPayload } from "@/services/organisations";
import { useStore } from "@/data/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import Results from "@/components/Results";
import { useTranslations } from "next-intl";
import { getCustodianUsers } from "@/services/custodian_users";
import { formatShortDate } from "@/utils/date";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Icon from "@/components/Icon";

const NAMESPACE_PROFILE_ORGANISATION = "ProfileOrganisation";

export default function Delegates() {
  const t = useTranslations(NAMESPACE_PROFILE_ORGANISATION);

  const { organisation, setOrganisation } = useStore(state => {
    return {
      organisation: state.config.organisation,
      setOrganisation: state.setOrganisation,
    };
  });

  const custodian = useStore(state => state.getCustodian());

  const {
    isError: isGetCustodiansError,
    isLoading: isGetCustodiansLoading,
    data: custodiansData,
  } = useQuery({
    queryKey: ["getCustodianUsers", custodian?.id],
    queryFn: () => getCustodianUsers(),
  });

  const {
    mutateAsync: mutateUpdateAsync,
    isError,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationKey: ["patchCustodian", organisation?.id],
    mutationFn: (payload: PatchOrganisationPayload) =>
      patchOrganisation(organisation?.id, payload, {
        error: {
          message: "submitError",
        },
      }),
  });

  const handleSubmit = async (fields: DelegatesFormValues) => {
    const payload = { ...organisation, ...fields };

    await mutateUpdateAsync(payload);

    setOrganisation(payload);
  };
  return (
    <PageGuidance {...mockedManageDelegatesGuidance}>
      <DelegatesForm
        onSubmit={handleSubmit}
        queryState={{
          isError,
          isLoading,
          error,
        }}
      />
      <Results
        noResultsMessage={t("noDelegates")}
        errorMessage={t("getError")}
        queryState={{
          isLoading: isGetCustodiansLoading,
          isError: isGetCustodiansError,
        }}>
        {custodiansData?.data.map(custodianUser => {
          const { first_name, last_name, created_at, email } = custodianUser;

          return (
            <Card sx={{ mb: 1 }} role="listitem" key={email}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      md: "row",
                    },
                    width: "100%",
                    gap: {
                      xs: 1,
                      md: 2,
                    },
                    alignItems: {
                      md: "center",
                    },
                  }}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Icon size="xlarge">
                      <PersonOutlineOutlinedIcon />
                    </Icon>
                    <div>
                      <Typography variant="h6">
                        {first_name} {last_name}
                      </Typography>
                      {/* Will be read from db */}
                      <Typography>Administrator</Typography>
                    </div>
                  </Box>
                  <Box
                    sx={{
                      flexGrow: 1,
                      textAlign: {
                        md: "right",
                      },
                    }}>
                    <Typography color="caption.main">
                      {t("addedOn", {
                        date: formatShortDate(created_at),
                      })}
                    </Typography>
                    <Typography color="caption.main">
                      {t("lastLoggedIn", {
                        date: formatShortDate(),
                      })}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      aria-label="Edit user"
                    
                      >
                      <CreateOutlinedIcon sx={{ color: "default.main" }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      aria-label="Delete user"
                      >
                      <DeleteForeverOutlinedIcon sx={{ color: "error.main" }} />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Results>
    </PageGuidance>
  )
}
