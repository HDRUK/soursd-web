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
  patchAffiliationsQuery,
  postAffiliationQuery,
} from "@/services/affiliations";
import { PostAffiliationPayload } from "@/services/affiliations/types";
import { ResearcherAffiliation } from "@/types/application";
import {
  renderAffiliationDateRangeCell,
  renderWarningCell,
} from "@/utils/cells";
import { Button, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Message } from "@/components/Message";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AffiliationsForm from "../AffiliationsForm";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function Affiliations() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const [open, setOpen] = useState(false);
  const [selectedAffiliation, setSelectedAffiliation] = useState<
    ResearcherAffiliation | undefined
  >(undefined);
  const routes = useStore(state => state.getApplication().routes);

  const { getHistories, setHistories, user } = useStore(state => ({
    user: state.config.user,
    getHistories: state.getHistories,
    setHistories: state.setHistories,
  }));

  const {
    data: affiliationsData,
    refetch,
    ...getAffiliationsQueryState
  } = useQuery(getAffiliationsQuery(user?.registry_id));

  const { mutateAsync: postAffiliations, ...postAffiliationQueryState } =
    useMutation(postAffiliationQuery(user));

  const { mutateAsync: patchAffiliations, ...patchAffiliationQueryState } =
    useMutation(patchAffiliationsQuery(user));

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
    (info: { row: { original: ResearcherAffiliation } }) => {
      const affiliation = info.row.original;
      return (
        <ActionMenu>
          <ActionMenuItem
            onClick={() => {
              // Placeholder for delete action
            }}
            sx={{ color: "error.main" }}
            icon={<DeleteOutlineOutlinedIcon sx={{ color: "error.main" }} />}>
            {tProfile("delete")}
          </ActionMenuItem>
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

  const columns: ColumnDef<ResearcherAffiliation>[] = [
    {
      accessorKey: "warning",
      header: "",
      cell: renderWarningCell,
    },
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
      if (selectedAffiliation) {
        // Update existing affiliation
        await patchAffiliations({
          ...fields,
          id: selectedAffiliation.id,
          to: fields.current_employer ? null : fields.to,
        });
      } else {
        // Create new affiliation
        await postAffiliations({
          ...fields,
          to: fields.current_employer ? null : fields.to,
        });
      }
      // setSelectedAffiliation(undefined);
      refetch();
    },
    [selectedAffiliation, postAffiliations, patchAffiliations]
  );

  useEffect(() => {
    const storeHistories = getHistories();

    setHistories({
      ...storeHistories,
      affiliations: affiliationsData?.data?.data,
    });
  }, [affiliationsData?.data?.data]);

  const ocrIdBannerToAppear = affiliationsData?.data.data.some(affiliation => {
    return affiliation.organisation_id === null || affiliation.email === null;
  });

  return (
    <PageBodyContainer heading={tProfile("affiliationsTitle")}>
      <PageGuidance {...mockedResearcherAffiliationsGuidance}>
        <PageBody>
          <PageSection>
            <FormModal
              open={open}
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
              total={affiliationsData?.data.data.length}
              data={affiliationsData?.data.data || []}
              columns={columns}
              queryState={getAffiliationsQueryState}
            />
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
