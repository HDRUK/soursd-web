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
  const accreditations = data.getAccreditations?.data?.data;
  const employments = data.getEmployments?.data;
  const educations = data.getEducations?.data;
  const projects = data.getProjects?.data?.data;
  const trainings = data.getTrainings?.data;

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
          {accreditations?.length ? (
            accreditations.map(accreditation => (
              <ResearcherAccreditationEntry data={accreditation} />
            ))
          ) : (
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
          {educations?.length ? (
            educations.map(education => (
              <ResearcherEducationEntry data={education} />
            ))
          ) : (
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
          {employments?.length ? (
            employments.map(employment => (
              <ResearcherEmploymentEntry data={employment} />
            ))
          ) : (
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
          {projects?.length ? (
            projects.map(project => <ResearcherProjectEntry data={project} />)
          ) : (
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
          {trainings?.length ? (
            trainings.map(training => (
              <ResearcherTrainingEntry data={training} />
            ))
          ) : (
            <Message severity="warning">{t("noTrainingsFound")}</Message>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
