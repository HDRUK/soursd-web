"use client";

import { useCallback, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { useTranslations } from "next-intl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CellContext } from "@tanstack/react-table";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import EmailIcon from "@mui/icons-material/Email";
import { Button, Typography } from "@mui/material";
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
  getAffiliationsQuery,
  patchAffiliationQuery,
  postAffiliationQuery,
} from "@/services/affiliations";
import { PostAffiliationPayload } from "@/services/affiliations/types";
import FormModal from "@/components/FormModal";
import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import { Message } from "@/components/Message";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import ContactLink from "@/components/ContactLink";
import { Status } from "@/components/ChipStatus";
import AffiliationsForm from "../AffiliationsForm";
import AskOrganisationModal from "../AskOrganisation";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function AffiliationsPage() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const [open, setOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
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
    refetch,
    ...getAffiliationsQueryState
  } = useQuery(getAffiliationsQuery(user?.registry_id));

  const { mutateAsync: postAffiliations, ...postAffiliationQueryState } =
    useMutation(postAffiliationQuery(user));

  const { mutateAsync: patchAffiliation, ...patchAffiliationQueryState } =
    useMutation(patchAffiliationQuery());

  const { mutateAsync: deleteAffiliation } = useMutation(
    deleteAffiliationQuery()
  );

  useQueryAlerts(
    selectedAffiliation
      ? patchAffiliationQueryState
      : postAffiliationQueryState,
    {
      commonAlertProps: {
        willClose: () => {
          setOpen(false);
          setSelectedAffiliation(undefined);
        },
      },
      successAlertProps: {
        confirmButtonText: tProfile("affiliationActionSuccessButton"),
        text: selectedAffiliation
          ? tProfile("patchAffiliationSuccess")
          : tProfile("postAffiliationSuccess"),
      },
      errorAlertProps: {
        text: ReactDOMServer.renderToString(
          tProfile.rich("affiliationActionError", {
            contactLink: ContactLink,
          })
        ),
        confirmButtonText: tProfile("affiliationActionErrorButton"),
      },
    }
  );

  const renderActionMenuCell = useCallback(
    (info: CellContext<ResearcherAffiliation, unknown>) => {
      const affiliation = info.row.original;
      const status = affiliation.registryAffiliationState;
      return (
        <ActionMenu>
          <ActionMenuItem
            onClick={() =>
              deleteAffiliation(affiliation.id).then(() => refetch())
            }
            sx={{ color: "error.main" }}
            icon={<DeleteOutlineOutlinedIcon sx={{ color: "error.main" }} />}>
            {tProfile("delete")}
          </ActionMenuItem>
          {status === Status.AFFILIATION_INVITED && (
            <ActionMenuItem
              onClick={() => {
                setSelectedAffiliation(affiliation);
                setInviteOpen(true);
              }}
              sx={{ color: "menuList1.main" }}
              icon={<EmailIcon sx={{ color: "menuList1.main" }} />}>
              {tProfile("reinviteOrganisation")}
            </ActionMenuItem>
          )}
          <ActionMenuItem
            onClick={() => {
              setSelectedAffiliation(affiliation);
              setOpen(true);
            }}
            sx={{ color: "menuList1.main" }}
            icon={<CreateOutlinedIcon sx={{ color: "menuList1.main" }} />}>
            {tProfile("viewOrEdit")}
          </ActionMenuItem>
        </ActionMenu>
      );
    },
    []
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
      console.log("**** payload fields", fields);
      if (selectedAffiliation) {
        // Update existing affiliation
        await patchAffiliation({
          affiliationId: selectedAffiliation.id,
          payload: fields,
        });
      } else {
        // Create new affiliation
        await postAffiliations(fields);
      }
      refetch();
    },
    [selectedAffiliation, postAffiliations, patchAffiliation]
  );

  const orcIdBannerToAppear = affiliationsData?.data.data.some(affiliation => {
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
                  : tProfile("addAffiliationForm")
              }>
              <AffiliationsForm
                onClose={() => {
                  setOpen(false);
                  setSelectedAffiliation(undefined);
                }}
                onSubmit={handleDetailsSubmit}
                queryState={
                  selectedAffiliation
                    ? patchAffiliationQueryState
                    : postAffiliationQueryState
                }
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
          <AskOrganisationModal
            organisationId={selectedAffiliation?.organisation.id}
            open={inviteOpen}
            onClose={() => setInviteOpen(false)}
          />
          <ProfileNavigationFooter
            previousHref={routes.profileResearcherIdentity.path}
            nextHref={routes.profileResearcherExperience.path}
            nextStepText={tProfile("experience")}
            isLoading={postAffiliationQueryState.isPending}
          />
        </PageBody>
      </PageGuidance>
    </PageBodyContainer>
  );
}
