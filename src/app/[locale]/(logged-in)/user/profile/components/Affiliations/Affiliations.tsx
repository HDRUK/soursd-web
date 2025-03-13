import ContactLink from "@/components/ContactLink";

import Results from "@/components/Results";
import { ROUTES } from "@/consts/router";
import { AffiliationRelationship } from "@/consts/user";
import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import {
  PageBody,
  PageBodyContainer,
  PageGuidance,
  PageSection,
} from "@/modules";
import {
  getAffiliationsQuery,
  postAffiliationQuery,
} from "@/services/affiliations";
import { PostAffiliationPayload } from "@/services/affiliations/types";
import { showAlert } from "@/utils/showAlert";
import {
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
import ReactDOMServer from "react-dom/server";
import { Message } from "@/components/Message";
import AffiliationsForm from "../AffiliationsForm";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function Affiliations() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { affiliations, getHistories, setHistories, user } = useStore(
    state => ({
      user: state.config.user,
      affiliations: state.config.histories?.affiliations || [],
      getHistories: state.getHistories,
      setHistories: state.setHistories,
    })
  );
  const { data: affiliationsData, ...getAffiliationsQueryState } = useQuery(
    getAffiliationsQuery(user?.registry_id)
  );

  const { mutateAsync, ...postAffiliationQueryState } = useMutation(
    postAffiliationQuery(user)
  );

  const handleDetailsSubmit = useCallback(
    async (fields: PostAffiliationPayload) => {
      try {
        await mutateAsync(fields);

        queryClient.refetchQueries({
          queryKey: ["getAffiliations", user?.registry_id],
        });

        showAlert("success", {
          text: tProfile("postAffiliationSuccess"),
          confirmButtonText: tProfile("postAffiliationSuccessButton"),
          preConfirm: () => {
            router.push(ROUTES.profileResearcherExperience.path);
          },
        });
      } catch (_) {
        showAlert("error", {
          text: ReactDOMServer.renderToString(
            tProfile.rich("postAffiliationError", {
              contactLink: ContactLink,
            })
          ),
          confirmButtonText: tProfile("postAffiliationErrorButton"),
        });
      }
    },
    [mutateAsync, user?.registry_id, tProfile]
  );

  useEffect(() => {
    const storeHistories = getHistories();

    setHistories({
      ...storeHistories,
      affiliations: affiliationsData?.data?.data,
    });
  }, [affiliationsData?.data?.data]);

  const ocrIdBannerToAppear = affiliations.some(affiliation => {
    return affiliation.organisation_id === null || affiliation.email === null;
  });

  return (
    <PageBodyContainer
      heading={tProfile("affiliationsTitle")}
      description={tProfile("affiliationsDescription")}>
      <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
        <PageBody>
          <PageSection>
            <AffiliationsForm
              onSubmit={handleDetailsSubmit}
              queryState={postAffiliationQueryState}
            />
            <Typography variant="h6" sx={{ mb: 1 }}>
              {tProfile("affiliationsRecords")}
            </Typography>
            {!ocrIdBannerToAppear && (
              <Message severity="warning" sx={{ mb: 2 }}>
                {/* This contains a link in the designs that should link to the first entry that needed to be edited, this can be implemented once edit affiliations is implemented */}
                {tProfile("missingOrcIdMessage")}
              </Message>
            )}{" "}
            <Results
              queryState={getAffiliationsQueryState}
              noResultsMessage={tProfile("affiliationsNoResultsMessage")}
              errorMessage={tProfile.rich("affiliationsErrorMessage", {
                contactLink: ContactLink,
              })}
              total={affiliations?.length}>
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
                  {affiliations?.map(
                    ({
                      member_id,
                      current_employer,
                      relationship,
                      organisation: { organisation_name },
                    }) => {
                      return (
                        <TableRow key={organisation_name}>
                          <TableCell>{organisation_name}</TableCell>
                          <TableCell>
                            {current_employer
                              ? tApplication("currentEmployer")
                              : relationship ===
                                  AffiliationRelationship.EMPLOYEE
                                ? tApplication("previousEmployer")
                                : tApplication(relationship)}
                          </TableCell>
                          <TableCell>{member_id}</TableCell>
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
