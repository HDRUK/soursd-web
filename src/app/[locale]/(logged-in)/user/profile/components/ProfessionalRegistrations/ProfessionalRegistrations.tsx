"use client";

import ContactLink from "@/components/ContactLink";
import Results from "@/components/Results";
import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
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
  Button,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ReactDOMServer from "react-dom/server";
import ProfessionalRegistrationsFormModal from "./ProfessionalRegistrationsFormModal";

const NAMESPACE_TRANSLATION_PROFILE = "ProfessionalRegistrations";

export default function ProfessionalRegistrations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useQueryAlerts(postProfessionalRegistrationQueryState, {
    errorAlertProps: {
      text: ReactDOMServer.renderToString(
        tProfile.rich("errorCreateMessage", {
          contactLink: ContactLink,
        })
      ),
    },
    successAlertProps: {
      text: tProfile("successCreateMessage"),
    },
  });

  const handleDetailsSubmit = useCallback(
    async (fields: PostProfessionalRegistrationPayload) => {
      await mutateAsync(fields);
      setIsModalOpen(false);
      queryClient.refetchQueries({
        queryKey: ["getProfessionalRegistrations", user?.registry_id],
      });
    },
    [mutateAsync, user?.registry_id, queryClient]
  );

  const data = professionalRegistrationsData?.data?.data;

  useEffect(() => {
    if (data) {
      const storeHistories = getHistories();
      setHistories({
        ...storeHistories,
        professionalRegistrations: data,
      });
    }
  }, [data, getHistories, setHistories]);

  return (
    <>
      <ProfessionalRegistrationsFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleDetailsSubmit}
        queryState={postProfessionalRegistrationQueryState}
      />

      <Typography variant="h6" sx={{ mb: 1 }}>
        {tProfile("resultsTitle")}
      </Typography>
      <Results
        queryState={getProfessionalRegistrationsQueryState}
        noResultsMessage={tProfile("professionalRegistrationsNoResultsMessage")}
        errorMessage={tProfile.rich("professionalRegsitrationsErrorMessage", {
          contactLink: ContactLink,
        })}
        count={professionalRegistrations.length}
        sx={{ maxWidth: "50%" }}
        total={professionalRegistrations.length}>
        <Table>
          <TableHead sx={{ backgroundColor: "lightPurple.main" }}>
            <TableRow>
              <TableCell scope="col">{tProfile("name")}</TableCell>
              <TableCell scope="col">{tProfile("id")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {professionalRegistrations.map(({ member_id, name }) => {
              return (
                <TableRow key={name}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{member_id}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Results>
      <Button
        startIcon={<AddIcon />}
        variant="outlined"
        color="primary"
        onClick={() => setIsModalOpen(true)}
        sx={{ mt: 2 }}>
        {tProfile("addProfessionalRegistration")}
      </Button>
    </>
  );
}
