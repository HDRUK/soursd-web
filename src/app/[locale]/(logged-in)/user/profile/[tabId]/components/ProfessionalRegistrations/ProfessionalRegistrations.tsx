import ContactLink from "@/components/ContactLink";

import Results from "@/components/Results";
import { useStore } from "@/data/store";
import {
  getProfessionalRegistrationsQuery,
  postProfessionalRegistrationQuery,
} from "@/services/professional_registrations";
import { PostProfessionalRegistrationPayload } from "@/services/professional_registrations/types";
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
import ProfessionalRegistrationsForm from "../ProfessionalRegistrationsForm";

const NAMESPACE_TRANSLATION_PROFILE = "ProfessionalRegistrations";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function ProfessionalRegistrations() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const queryClient = useQueryClient();

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
    <>
      <ProfessionalRegistrationsForm
        onSubmit={handleDetailsSubmit}
        queryState={postProfessionalRegistrationQueryState}
      />
      <Typography variant="h6" sx={{ mb: 1 }}>
        {tProfile("professionalRegistrationsRecords")}
      </Typography>
      <Results
        queryState={getProfessionalRegistrationsQueryState}
        noResultsMessage={tProfile("professionalRegsitrationsNoResultsMessage")}
        errorMessage={tProfile.rich("professionalRegsitrationsErrorMessage", {
          contactLink: ContactLink,
        })}
        count={professionalRegistrationsData?.data?.data.length}>
        <Table>
          <TableHead sx={{ backgroundColor: "lightPurple.main" }}>
            <TableRow>
              <TableCell scope="col">{tProfile("name")}</TableCell>
              <TableCell scope="col">{tProfile("id")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {professionalRegistrationsData?.data?.data?.map(
              ({ member_id, name }) => {
                return (
                  <TableRow key={name}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{member_id}</TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </Results>
    </>
  );
}
