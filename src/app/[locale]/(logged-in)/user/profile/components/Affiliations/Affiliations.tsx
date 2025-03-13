import ContactLink from "@/components/ContactLink";

import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import ChipStatus, { Status } from "@/components/ChipStatus";
import FormModal from "@/components/FormModal";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import Table from "@/components/Table";
import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { mockedResearcherAffiliationsGuidance } from "@/mocks/data/cms";
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
import { ResearcherAffiliation } from "@/types/application";
import { renderAffiliationDateRangeCell } from "@/utils/cells";
import { Button, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Message } from "@/components/Message";
import AffiliationsForm from "../AffiliationsForm";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function Affiliations() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const [open, setOpen] = useState(false);
  const routes = useStore(state => state.getApplication().routes);

  const { affiliations, getHistories, setHistories, user } = useStore(
    state => ({
      user: state.config.user,
      affiliations: state.config.histories?.affiliations || [],
      getHistories: state.getHistories,
      setHistories: state.setHistories,
    })
  );

  const {
    data: affiliationsData,
    refetch,
    ...getAffiliationsQueryState
  } = useQuery(getAffiliationsQuery(user?.registry_id));

  const { mutateAsync, ...postAffiliationQueryState } = useMutation(
    postAffiliationQuery(user)
  );

  useQueryAlerts(postAffiliationQueryState, {
    commonAlertProps: {
      willClose: () => {
        setOpen(false);
      },
    },
    successAlertProps: {
      confirmButtonText: tProfile("postAffiliationSuccessButton"),
      text: tProfile("postAffiliationSuccess"),
    },
    errorAlertProps: {
      text: ReactDOMServer.renderToString(
        tProfile.rich("postAffiliationError", {
          contactLink: ContactLink,
        })
      ),
      confirmButtonText: tProfile("postAffiliationErrorButton"),
    },
  });

  const renderActionMenuCell = useCallback(() => {
    return (
      <ActionMenu>
        <ActionMenuItem
          onClick={() => {
            // Placeholder
          }}>
          Delete affiliation
        </ActionMenuItem>
      </ActionMenu>
    );
  }, []);

  const columns: ColumnDef<ResearcherAffiliation>[] = [
    {
      accessorKey: "date",
      header: tApplication("period"),
      cell: renderAffiliationDateRangeCell,
    },
    {
      accessorKey: "organisation_name",
      header: tApplication("organisationName"),
      cell: info => info.row.original.organisation.organisation_name,
    },
    {
      accessorKey: "relationship",
      header: tApplication("relationship"),
    },
    {
      accessorKey: "member_id",
      header: tApplication("staffStudentId"),
    },
    {
      accessorKey: "status",
      header: tApplication("status"),
      cell: () => <ChipStatus status={Status.INVITE_SENT} color="success" />,
    },
    {
      accessorKey: "action",
      header: "",
      cell: renderActionMenuCell,
    },
  ];

  const handleDetailsSubmit = useCallback(
    async (fields: PostAffiliationPayload) => {
      await mutateAsync({
        ...fields,
        to: fields.current_employer ? null : fields.to,
      });

      refetch();
    },
    [mutateAsync]
  );

  useEffect(() => {
    const storeHistories = getHistories();

    setHistories({
      ...storeHistories,
      affiliations: affiliationsData?.data?.data,
    });
  }, [affiliationsData?.data?.data]);

  const ocrIdBannerToAppear = affiliationsData.data.some(affiliation => {
    return affiliation.organisation_id === null || affiliation.email === null;
  });

  return (
    <PageBodyContainer heading={tProfile("affiliationsTitle")}>
      <PageGuidance {...mockedResearcherAffiliationsGuidance}>
        <PageBody>
          <PageSection>
            <FormModal open={open} heading={tProfile("affiliationsForm")}>
              <AffiliationsForm
                onClose={() => {
                  setOpen(false);
                }}
                onSubmit={handleDetailsSubmit}
                queryState={postAffiliationQueryState}
              />
            </FormModal>
            <Typography sx={{ mb: 2 }}>
              {tProfile("affiliationsDescription")}
            </Typography>
            {!!ocrIdBannerToAppear && (
              <Message severity="warning" sx={{ mb: 2 }}>
                {/* This contains a link in the designs that should link to the first entry that needed to be edited, this can be implemented once edit affiliations is implemented */}
                {tProfile("missingOrcIdMessage")}
              </Message>
            )}{" "}
            <Table
              noResultsMessage={tProfile("affiliationsNoResultsMessage")}
              errorMessage={tProfile.rich("affiliationsErrorMessage", {
                contactLink: ContactLink,
              })}
              total={affiliations.length}
              data={affiliations || []}
              columns={columns}
              queryState={getAffiliationsQueryState}
            />
          </PageSection>
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(true);
              }}>
              {tProfile("addAffiliation")}
            </Button>
          </div>
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
