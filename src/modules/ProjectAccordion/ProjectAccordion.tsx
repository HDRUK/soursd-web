"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import { useStore } from "@/data/store";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { PALETTE_THEME_PURPLE_BLUE } from "../../config/theme";
import { ResearcherProject } from "../../types/application";
import { getOrganisationQuery } from "../../services/organisations";
import AccordionTitle from "../../components/AccordionTitle";
import ProjectUserList from "../ProjectUserList";

interface ProjectAccordionProps {
  project: ResearcherProject;
}

const ProjectAccordion = ({ project }: ProjectAccordionProps) => {
  const {
    title: projectTitle,
    unique_id: projectUniqueId,
    approvals,
  } = project;

  const organisation = useStore(store => store.getOrganisation());
  const { id: organisationId } = organisation || {};

  const { data: organisationData } = useQuery(
    getOrganisationQuery(organisationId, {
      responseOptions: {
        error: {
          message: "getOrganisationDetailsForCustodianError",
        },
      },
      enabled: !!organisationId,
    })
  );

  const { organisation_name } = organisationData?.data || {};

  const ariaId = organisation_name?.replace(/[^\w]*/g, "");

  // is approved by any custodian (?)
  const isApproved = approvals?.length > 0;

  const accordianColor = isApproved
    ? PALETTE_THEME_PURPLE_BLUE.palette.success.light
    : PALETTE_THEME_PURPLE_BLUE.palette.error.light;

  return (
    <Accordion
      data-testid={`project-accordion-${organisation_name}`}
      key={organisation_name}>
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
  );
};

export default ProjectAccordion;
