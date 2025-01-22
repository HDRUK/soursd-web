import ContactLink from "@/components/ContactLink";

import Results from "@/components/Results";
import { AffiliationRelationship } from "@/consts/user";
import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
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
import { useCallback, useEffect } from "react";
import AffiliationsForm from "../AffiliationsForm";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function Affiliations() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const queryClient = useQueryClient();

  const { user, affiliations, getHistories, setHistories } = useStore(
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
        });
      } catch (_) {
        showAlert("error", {
          text: tProfile.rich("postAffiliationError", {
            contactLink: ContactLink,
          }),
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

  return (
    <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
      <AffiliationsForm
        onSubmit={handleDetailsSubmit}
        queryState={postAffiliationQueryState}
      />
      <Typography variant="h6" sx={{ mb: 1 }}>
        {tProfile("affiliationsRecords")}
      </Typography>
      <Results
        queryState={getAffiliationsQueryState}
        noResultsMessage={tProfile("affiliationsNoResultsMessage")}
        errorMessage={tProfile.rich("affiliationsErrorMessage", {
          contactLink: ContactLink,
        })}
        count={affiliations?.length}>
        <Table>
          <TableHead sx={{ backgroundColor: "lightPurple.main" }}>
            <TableRow>
              <TableCell scope="col">
                {tApplication("organisationName")}
              </TableCell>
              <TableCell scope="col">{tApplication("relationship")}</TableCell>
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
                  <TableRow>
                    <TableCell>{organisation_name}</TableCell>
                    <TableCell>
                      {current_employer
                        ? tApplication("currentEmployer")
                        : relationship === AffiliationRelationship.EMPLOYEE
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
    </PageGuidance>
  );
}
