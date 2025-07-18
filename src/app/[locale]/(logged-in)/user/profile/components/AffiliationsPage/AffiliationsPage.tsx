"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { CellContext } from "@tanstack/react-table";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import EmailIcon from "@mui/icons-material/Email";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useStore } from "@/data/store";
import { mockedResearcherAffiliationsGuidance } from "@/mocks/data/cms";
import {
  PageBody,
  PageBodyContainer,
  PageGuidance,
  Affiliations,
  PageSection,
} from "@/modules";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { ResearcherAffiliation } from "@/types/application";
import {
  deleteAffiliationQuery,
  putAffiliationQuery,
  postAffiliationQuery,
  usePaginatedAffiliations,
} from "@/services/affiliations";
import { PostAffiliationPayload } from "@/services/affiliations/types";
import FormModal from "@/components/FormModal";
import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import { Message } from "@/components/Message";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import { Status } from "@/components/ChipStatus";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";
import useOrganisationInvite from "@/queries/useOrganisationInvite";
import { QueryState } from "@/types/form";
import { getCombinedQueryState } from "@/utils/query";
import { renderErrorToString } from "@/utils/translations";
import { showAlert } from "@/utils/showAlert";
import AffiliationsForm from "../AffiliationsForm";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function AffiliationsPage() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const [open, setOpen] = useState(false);
  const [selectedAffiliation, setSelectedAffiliation] = useState<
    ResearcherAffiliation | undefined
  >(undefined);
  const routes = useStore(state => state.getApplication().routes);

  const { user, setHistories, getHistories } = useStore(state => ({
    user: state.config.user,
    setHistories: state.setHistories,
    getHistories: state.getHistories,
  }));

  const {
    data: affiliationsData,
    last_page,
    total,
    setPage,
    refetch,
    ...getAffiliationsQueryState
  } = usePaginatedAffiliations(user?.registry_id);

  const { mutateAsync: postAffiliations, ...postAffiliationQueryState } =
    useMutation(postAffiliationQuery(user));

  const { mutateAsync: putAffiliation, ...putAffiliationQueryState } =
    useMutation(putAffiliationQuery());

  const { mutateAsync: deleteAffiliation, ...restDeleteState } = useMutation(
    deleteAffiliationQuery()
  );

  const {
    queryState: inviteQueryState,
    handleSubmit: handleCreateAndInviteOrganisation,
    mutateOrganisationInvite,
  } = useOrganisationInvite();

  const combinedQueryState = getCombinedQueryState(
    [inviteQueryState, postAffiliationQueryState, putAffiliationQueryState],
    false
  ) as QueryState;

  useQueryAlerts(
    selectedAffiliation ? putAffiliationQueryState : postAffiliationQueryState,
    {
      onSuccess: () => {
        setOpen(false);
        setSelectedAffiliation(undefined);
      },
      successAlertProps: {
        confirmButtonText: tProfile("affiliationActionSuccessButton"),
        text: selectedAffiliation
          ? tProfile("putAffiliationSuccess")
          : tProfile("postAffiliationSuccess"),
      },
      errorAlertProps: {
        text: renderErrorToString(tProfile, "affiliationActionError"),
        confirmButtonText: tProfile("affiliationActionErrorButton"),
      },
    }
  );

  const showConfirmDelete = useQueryConfirmAlerts(restDeleteState, {
    onSuccess: () => refetch(),
    confirmAlertProps: {
      text: tProfile("affiliationsDeleteConfirmMessage"),
      preConfirm: async (id: number) => {
        await deleteAffiliation(id);
      },
    },
    successAlertProps: {
      text: tProfile("affiliationsDeleteSuccessMessage"),
    },
    errorAlertProps: {
      text: renderErrorToString(tProfile, "affiliationsDeleteErrorMessage"),
    },
  });

  const handleResendInvite = async (affiliation: ResearcherAffiliation) => {
    await mutateOrganisationInvite(affiliation?.organisation_id as number);
    showAlert("success", {
      text: tProfile("resendInviteSuccess"),
    });
  };

  const renderActionMenuCell = useCallback(
    (info: CellContext<ResearcherAffiliation, unknown>) => {
      const affiliation = info.row.original;
      const status = affiliation.registryAffiliationState;
      return (
        <ActionMenu>
          <ActionMenuItem
            onClick={() => {
              setSelectedAffiliation(affiliation);
              setOpen(true);
            }}
            sx={{ color: "secondary.main" }}
            icon={<CreateOutlinedIcon sx={{ color: "secondary.main" }} />}>
            {tProfile("viewOrEdit")}
          </ActionMenuItem>
          {status === Status.AFFILIATION_INVITED && (
            <ActionMenuItem
              disabled={inviteQueryState.isLoading}
              onClick={() => {
                setSelectedAffiliation(affiliation);
                handleResendInvite(affiliation);
              }}
              sx={{ color: "secondary.main" }}
              icon={
                inviteQueryState.isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <EmailIcon sx={{ color: "secondary.main" }} />
                )
              }>
              {tProfile("reinviteOrganisation")}
            </ActionMenuItem>
          )}
          <ActionMenuItem
            onClick={() => showConfirmDelete(affiliation.id)}
            sx={{ color: "error.main" }}
            icon={<DeleteOutlineOutlinedIcon sx={{ color: "error.main" }} />}>
            {tProfile("delete")}
          </ActionMenuItem>
        </ActionMenu>
      );
    },
    [inviteQueryState]
  );

  const extraColumns = [
    {
      accessorKey: "action",
      header: "",
      cell: renderActionMenuCell,
    },
  ];

  const handleDetailsSubmit = useCallback(
    async (fields: PostAffiliationPayload) => {
      let organisation_id = fields?.organisation_id;

      if (!organisation_id) {
        const invitePayload = {
          organisation_name: fields.organisation_name as string,
          lead_applicant_email: fields.organisation_email as string,
        };
        organisation_id =
          await handleCreateAndInviteOrganisation(invitePayload);
      }

      const {
        organisation_name: _name,
        organisation_email: _email,
        ...restFields
      } = fields;

      const payload = {
        ...restFields,
        organisation_id,
      };

      if (selectedAffiliation) {
        // Update existing affiliation
        await putAffiliation({
          affiliationId: selectedAffiliation.id,
          payload,
        });
      } else {
        // Create new affiliation
        await postAffiliations(payload);
      }
      refetch();
    },
    [selectedAffiliation, postAffiliations, putAffiliation]
  );

  const orcIdBannerToAppear = affiliationsData?.some(affiliation => {
    return affiliation.organisation_id === null || affiliation.email === null;
  });

  return (
    <PageBodyContainer heading={tProfile("affiliationsTitle")}>
      <PageGuidance {...mockedResearcherAffiliationsGuidance}>
        <PageBody>
          <PageSection>
            <FormModal
              open={open}
              isDismissable
              onClose={() => {
                setOpen(false);
              }}
              heading={
                selectedAffiliation
                  ? tProfile("editAffiliationForm")
                  : tProfile("addAffiliationSelectOrganisationForm")
              }>
              <AffiliationsForm
                onClose={() => {
                  setOpen(false);
                  setSelectedAffiliation(undefined);
                }}
                onSubmit={handleDetailsSubmit}
                queryState={combinedQueryState}
                initialValues={selectedAffiliation}
              />
            </FormModal>
            <Typography sx={{ mb: 2 }}>
              {tProfile("affiliationsDescription")}
            </Typography>
            {!!orcIdBannerToAppear && (
              <Message severity="warning" sx={{ mb: 2 }}>
                {/* This contains a link in the designs that should link to the first entry that needed to be edited, this can be implemented once edit affiliations is implemented */}
                {tProfile("missingOrcIdMessage")}
              </Message>
            )}{" "}
            {affiliationsData && (
              <Affiliations
                setHistories={setHistories}
                getHistories={getHistories}
                extraColumns={extraColumns}
                affiliationsData={affiliationsData}
                getAffiliationsQueryState={getAffiliationsQueryState}
                last_page={last_page}
                total={total}
                setPage={setPage}
              />
            )}
          </PageSection>

          <div>
            <Button
              variant="outlined"
              onClick={() => {
                setSelectedAffiliation(undefined);
                setOpen(true);
              }}>
              {tProfile("addAffiliation")}
            </Button>
          </div>

          <ProfileNavigationFooter
            previousHref={routes.profileResearcherExperience.path}
            nextHref={routes.profileResearcherTraining.path}
            nextStepText={tProfile("training")}
            isLoading={combinedQueryState.isLoading}
          />
        </PageBody>
      </PageGuidance>
    </PageBodyContainer>
  );
}
