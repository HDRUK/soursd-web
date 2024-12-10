"use client";

import AccordionTitle from "@/components/AccordionTitle";
import { getOrganisation } from "@/services/organisations";

import { PALETTE_THEME_PURPLE_BLUE } from "@/config/theme";
import { ResearcherProject } from "@/types/application";

import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useStore } from "@/data/store";
import { useQuery } from "@tanstack/react-query";
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

  const { data: organisationData } = useQuery({
    queryKey: ["getOrganisationDetailsForIssuer", organisationId],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;

      return getOrganisation(id, {
        error: {
          message: "getOrganisationDetailsForIssuerError",
        },
      });
    },
    enabled: !!organisationId,
  });

  const { organisation_name } = organisationData?.data || {};

  const ariaId = organisation_name?.replace(/[^\w]*/g, "");

  const isApproved =
    approvals?.filter(a => a.issuer_id === organisationId).length > 0;

  const accordianColor = isApproved
    ? PALETTE_THEME_PURPLE_BLUE.palette.success.light
    : PALETTE_THEME_PURPLE_BLUE.palette.error.light;

  return (
    <Accordion key={organisation_name}>
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
