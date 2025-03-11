"use client";

import ContactLink from "@/components/ContactLink";
import Results from "@/components/Results";
import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import {
  deleteProfessionalRegistrationQuery,
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
import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import { ResearcherProfessionalRegistration } from "@/types/application";
import useMutationUpdateProfessionalRegistration from "@/queries/useMutationUpdateProfessionalRegistration";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";

const NAMESPACE_TRANSLATION_PROFILE = "ProfessionalRegistrations";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function ProfessionalRegistrations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRecord, setEditRecord] =
    useState<ResearcherProfessionalRegistration>();
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

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
    refetch,
    ...getProfessionalRegistrationsQueryState
  } = useQuery(getProfessionalRegistrationsQuery(user?.registry_id));

  const { mutateAsync, reset, ...postProfessionalRegistrationQueryState } =
    useMutationUpdateProfessionalRegistration(user?.registry_id);

  const {
    mutateAsync: mutateDeleteAsync,
    ...deleteProfessionalRegistrationQueryState
  } = useMutation(deleteProfessionalRegistrationQuery());

  useQueryAlerts(postProfessionalRegistrationQueryState, {
    commonAlertProps: {
      willClose: () => {
        reset();
      },
    },
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

  // Confirm for delete
  const showDeleteConfirm = useQueryConfirmAlerts<number>(
    deleteProfessionalRegistrationQueryState,
    {
      confirmAlertProps: {
        willClose: async (id: number) => {
          await mutateDeleteAsync(id);

          refetch();
        },
      },
      errorAlertProps: {
        text: ReactDOMServer.renderToString(
          tProfile.rich("errorDeleteMessage", {
            contactLink: ContactLink,
          })
        ),
      },
      successAlertProps: {
        text: tProfile("successDeleteMessage"),
      },
    }
  );

  const handleDetailsSubmit = useCallback(
    async (
      fields: PostProfessionalRegistrationPayload &
        ResearcherProfessionalRegistration
    ) => {
      await mutateAsync(fields);
      setIsModalOpen(false);

      refetch();
    },
    [mutateAsync, user?.registry_id]
  );

  const handleDelete = async (id: number) => {
    showDeleteConfirm(id);
  };

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

  useEffect(() => {
    if (!!editRecord) setIsModalOpen(true);
  }, [editRecord]);

  return (
    <>
      <ProfessionalRegistrationsFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleDetailsSubmit}
        queryState={postProfessionalRegistrationQueryState}
        data={editRecord}
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
        sx={{ maxWidth: "50%" }}
        total={professionalRegistrations.length}>
        <Table>
          <TableHead sx={{ backgroundColor: "lightPurple.main" }}>
            <TableRow>
              <TableCell scope="col">{tProfile("name")}</TableCell>
              <TableCell scope="col">{tProfile("id")}</TableCell>
              <TableCell scope="col"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {professionalRegistrations.map(
              (
                professionalRegistration: ResearcherProfessionalRegistration
              ) => {
                const { member_id, name, id } = professionalRegistration;

                return (
                  <TableRow key={name}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{member_id}</TableCell>
                    <TableCell>
                      <ActionMenu aria-label={`Action for ${name}`}>
                        <ActionMenuItem
                          onClick={() => {
                            setEditRecord(professionalRegistration);
                          }}>
                          {tApplication("edit")}
                        </ActionMenuItem>
                        <ActionMenuItem
                          onClick={() => {
                            handleDelete(id);
                          }}>
                          {tApplication("delete")}
                        </ActionMenuItem>
                      </ActionMenu>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
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
