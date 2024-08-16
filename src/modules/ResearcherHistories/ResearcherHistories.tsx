import ResearcherAccreditationEntry from "@/modules/ResearcherAccreditationEntry";
import ResearcherEducationEntry from "@/modules/ResearcherEducationEntry";
import ResearcherEmploymentEntry from "@/modules/ResearcherEmploymentEntry";
import ResearcherProjectEntry from "@/modules/ResearcherProjectEntry";
import ResearcherTrainingEntry from "@/modules/ResearcherTrainingEntry";
import { HistoryCombinedData } from "@/queries/useQueriesHistories";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useTranslations } from "next-intl";

interface ResearcherHistoriesProps {
  data: HistoryCombinedData;
}

const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function ResearcherHistories({
  data,
}: ResearcherHistoriesProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

  return (
    <>
      <Accordion>
        <AccordionSummary
          aria-controls="accreditations-content"
          id="accreditations-header"
          expandIcon={<ExpandMoreIcon />}>
          {t("accreditations")}
        </AccordionSummary>
        <AccordionDetails>
          {data.getAccreditations?.data?.data.map(accreditation => (
            <ResearcherAccreditationEntry data={accreditation} />
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          aria-controls="educations-content"
          id="educations-header"
          expandIcon={<ExpandMoreIcon />}>
          {t("education")}
        </AccordionSummary>
        <AccordionDetails>
          {data.getEducations?.data.map(education => (
            <ResearcherEducationEntry data={education} />
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          aria-controls="employments-content"
          id="employments-header"
          expandIcon={<ExpandMoreIcon />}>
          {t("employment")}
        </AccordionSummary>
        <AccordionDetails>
          {data.getEmployments?.data.map(employment => (
            <ResearcherEmploymentEntry data={employment} />
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          aria-controls="projects-content"
          id="projects-header"
          expandIcon={<ExpandMoreIcon />}>
          {t("projects")}
        </AccordionSummary>
        <AccordionDetails>
          {data.getProjects?.data.data.map(project => (
            <ResearcherProjectEntry data={project} />
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          aria-controls="training-content"
          id="training-header"
          expandIcon={<ExpandMoreIcon />}>
          {t("training")}
        </AccordionSummary>
        <AccordionDetails>
          {data.getTrainings?.data.map(training => (
            <ResearcherTrainingEntry data={training} />
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
