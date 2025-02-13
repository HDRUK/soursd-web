import ContactLink from "@/components/ContactLink";

import Results from "@/components/Results";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import {
  PageBody,
  PageBodyContainer,
  PageGuidance,
  PageSection,
} from "@/modules";
import {
  getProfessionalRegistrationsQuery,
  postProfessionalRegistrationQuery,
} from "@/services/professional_registrations";
import { PostProfessionalRegistrationPayload } from "@/services/professional_registrations/types";
import EastIcon from "@mui/icons-material/East";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import ProfessionalRegistrationsForm from "../ProfessionalRegistrationsForm";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function Affiliations() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { user, professionalRegistrations, getHistories, setHistories } =
    useStore(state => ({
      user: state.config.user,
      professionalRegistrations:
        state.config.histories?.professionalRegistrations || [],
      getHistories: state.getHistories,
      setHistories: state.setHistories,
    }));

  const {
    data: professionalRegistrationsData,
    ...getProfessionalRegistrationsQueryState
  } = useQuery(getProfessionalRegistrationsQuery(user?.registry_id));

  const { mutateAsync, ...postProfessionalRegistrationQueryState } =
    useMutation(postProfessionalRegistrationQuery(user?.registry_id));

  const handleDetailsSubmit = useCallback(
    async (fields: PostProfessionalRegistrationPayload) => {
      await mutateAsync(fields);

      queryClient.refetchQueries({
        queryKey: ["getProfessionalRegistration", user?.registry_id],
      });
    },
    [mutateAsync, user?.registry_id, tProfile]
  );

  useEffect(() => {
    const storeHistories = getHistories();

    setHistories({
      ...storeHistories,
      professionalRegistrations: professionalRegistrationsData?.data?.data,
    });
  }, [professionalRegistrationsData?.data?.data]);

  return (
    <PageBodyContainer>
      <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
        <PageBody>
          <PageSection>
            <ProfessionalRegistrationsForm
              onSubmit={handleDetailsSubmit}
              queryState={postProfessionalRegistrationQueryState}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <LoadingButton
                sx={{ display: "flex" }}
                endIcon={<EastIcon />}
                onClick={() =>
                  router.push(ROUTES.profileResearcherTraining.path)
                }>
                {tProfile("continueLinkText")}
              </LoadingButton>
            </Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {tProfile("affiliationsRecords")}
            </Typography>
            <Results
              queryState={getProfessionalRegistrationsQueryState}
              noResultsMessage={tProfile("affiliationsNoResultsMessage")}
              errorMessage={tProfile.rich("affiliationsErrorMessage", {
                contactLink: ContactLink,
              })}
              count={professionalRegistrationsData?.data?.data.length}>
              <Table>
                <TableHead sx={{ backgroundColor: "lightPurple.main" }}>
                  <TableRow>
                    <TableCell scope="col">
                      {tApplication("organisationName")}
                    </TableCell>
                    <TableCell scope="col">
                      {tApplication("relationship")}
                    </TableCell>
                    <TableCell scope="col">
                      {tApplication("staffStudentId")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {professionalRegistrations?.map(
                    ({ registration_id, name }) => {
                      return (
                        <TableRow key={name}>
                          <TableCell>{name}</TableCell>
                          <TableCell>{registration_id}</TableCell>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </Results>
          </PageSection>
        </PageBody>
      </PageGuidance>
    </PageBodyContainer>
  );
}
