"use client";

import AccordionTitle from "@/components/AccordionTitle";
import ActionMenu from "@/components/ActionMenu/ActionMenu";
import ActionMenuItem from "@/components/ActionMenu/ActionMenuItem";
import ApprovalStatus from "@/components/ApprovalStatus";
import { useApplicationData } from "@/context/ApplicationData";
import { PostApprovalPayloadWithEntity } from "@/services/approvals";
import { Organisation, getOrganisation } from "@/services/organisations";
import { EntityType } from "@/types/api";
import { PALETTE_THEME_PURPLE_BLUE } from "@/config/theme";

import { FormMutateState } from "@/types/form";
import BusinessIcon from "@mui/icons-material/Business";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LoadingButton } from "@mui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import OrganisationDetailsModal from "../OrganisationDetailsModal";
import OrganisationUsersList from "../OrganisationUsersList";

interface ProjectListProps {
  projects: any[];
  onApprove(payload: PostApprovalPayloadWithEntity): void;
  onUnapprove(payload: PostApprovalPayloadWithEntity): void;
  mutateState: FormMutateState;
}

interface ActiveOrganisationData {
  organisation: Organisation;
  isApproved: boolean;
}

const NAMESPACE_TRANSLATIONS_USERS_LIST = "UsersList";

const ProjectAccordion = ({ project, first }) => {
  const { routes } = useApplicationData();

  const t = useTranslations(NAMESPACE_TRANSLATIONS_USERS_LIST);
  const {
    id,
    affiliate_id,
    title: projectTitle,
    unique_id: projectUniqueId,
  } = project;

  const {
    data: organisationData,
    isLoading: organisationIsLoading,
    error: organisationError,
  } = useQuery({
    queryKey: ["getOrganisationDetailsForIssuer", affiliate_id],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;

      return getOrganisation(id, {
        error: {
          message: "getOrganisationDetailsForIssuerError",
        },
      });
    },
    enabled: !!affiliate_id,
  });

  const { organisation_name } = organisationData?.data || {};

  const ariaId = organisation_name?.replace(/[^\w]*/g, "");

  const isApproved = true; /* approvals.some(
    ({ id: issuerId }) => issuerId === ISSUER_ID
  ); */

  const accordianColor = isApproved
    ? PALETTE_THEME_PURPLE_BLUE.palette.success.light
    : PALETTE_THEME_PURPLE_BLUE.palette.error.light;

  return (
    <>
      <Accordion key={organisation_name} defaultExpanded={first}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ backgroundColor: accordianColor, color: "white" }}
          aria-controls={`${ariaId}-content`}
          id={`${ariaId}-header`}>
          <AccordionTitle
            icon={<FolderOpenIcon />}
            actions={
              <ActionMenu aria-label={`${organisation_name} actions`}>
                <ActionMenuItem>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    onClick={
                      () => {}
                      // handleViewResearcher({ organisation, isApproved })
                    }>
                    {t("viewDetails")}
                  </Button>
                </ActionMenuItem>
                <ActionMenuItem>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    href={`${routes.permissionsOrganisationIssuer.path}/${id}`}>
                    {t("permissions")}
                  </Button>
                </ActionMenuItem>
                <ActionMenuItem>
                  <LoadingButton
                    fullWidth
                    loading={false /* mutateState.isLoading */}
                    variant={isApproved ? "contained" : "outlined"}
                    color="success"
                    size="small"
                    onClick={
                      () => {}
                      /* handleApproveClick(
                        {
                          type: EntityType.ORGANISATION,
                          organisation_id: id,
                          issuer_id: ISSUER_ID,
                        },
                        isApproved
                      ) */
                    }>
                    {isApproved ? t("approved") : t("approve")}
                  </LoadingButton>
                </ActionMenuItem>
              </ActionMenu>
            }>
            <ApprovalStatus isApproved={isApproved}>
              {projectTitle} [{projectUniqueId}]
            </ApprovalStatus>
          </AccordionTitle>
        </AccordionSummary>
        <AccordionDetails>
          {/* <OrganisationUsersList
            mutateState={mutateState}
            organisation={organisation}
            onApproveToggle={handleApproveClick}
          /> */}
          <> hi </>
        </AccordionDetails>
      </Accordion>
      {/* activeData && (
        <OrganisationDetailsModal
          organisation={activeData.organisation}
          isApproved={activeData.isApproved}
          open={!!activeData}
          onClose={handleCloseModal}
        />
      ) */}
    </>
  );
};

export default function ProjectList({
  projects,
  onApprove,
  onUnapprove,
  mutateState,
}: ProjectListProps) {
  const { routes } = useApplicationData();
  const t = useTranslations(NAMESPACE_TRANSLATIONS_USERS_LIST);
  const [activeData, setActiveData] = useState<ActiveOrganisationData | null>(
    null
  );

  const handleApproveClick = (
    payload: PostApprovalPayloadWithEntity,
    isApproved: boolean
  ) => {
    if (!isApproved) {
      onApprove(payload);
    } else {
      onUnapprove(payload);
    }
  };

  const handleViewResearcher = (data: ActiveOrganisationData) => {
    setActiveData(data);
  };

  const handleCloseModal = () => {
    setActiveData(null);
  };

  return (
    <>
      {projects.map((project, i) => (
        <ProjectAccordion project={project} first={i === 0} />
      ))}
    </>
  );
}
