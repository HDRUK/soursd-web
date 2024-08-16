import { Message } from "@/components/Message";
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

const NAMESPACE_TRANSLATION_HISTORIES = "ResearcherHistories";

export default function ResearcherHistories({
  data,
}: ResearcherHistoriesProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_HISTORIES);

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
          {!data.getAccreditations?.data?.data.length && (
            <Message severity="warning">{t("noAccreditationsFound")}</Message>
          )}
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
          {!data.getEducations?.data.length && (
            <Message severity="warning">{t("noEducationsFound")}</Message>
          )}
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
          {!data.getEmployments?.data.length && (
            <Message severity="warning">{t("noEmploymentsFound")}</Message>
          )}
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
          {data.getProjects?.data?.data.map(project => (
            <ResearcherProjectEntry data={project} />
          ))}
          {!data.getProjects?.data?.data.length && (
            <Message severity="warning">{t("noProjectsFound")}</Message>
          )}
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
          {!data.getTrainings?.data.length && (
            <Message severity="warning">{t("noTrainingsFound")}</Message>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
