"use client";

import AccordionTitle from "@/components/AccordionTitle";
import { getOrganisation } from "@/services/organisations";

import { PALETTE_THEME_PURPLE_BLUE } from "@/config/theme";

import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import ProjectUserList from "../ProjectUserList";
import { ResearcherProject } from "@/types/application";

interface ProjectAccordionProps {
  project: ResearcherProject;
  first: boolean;
}

const NAMESPACE_TRANSLATIONS_USERS_LIST = "ProjectAccordion";

const ProjectAccordion = ({ project, first }: ProjectAccordionProps) => {
  const {
    affiliate_id,
    title: projectTitle,
    unique_id: projectUniqueId,
    approvals,
  } = project;

  const { data: organisationData } = useQuery({
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

  const isApproved =
    approvals.filter(a => a.issuer_id === affiliate_id).length > 0;
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
          <AccordionTitle icon={<FolderOpenIcon />} actions={[]}>
            {projectTitle} [{projectUniqueId}]
          </AccordionTitle>
        </AccordionSummary>
        <AccordionDetails>
          <ProjectUserList project={project} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ProjectAccordion;
