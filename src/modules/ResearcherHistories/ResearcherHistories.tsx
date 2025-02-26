import { Message } from "@/components/Message";
import ResearcherAccreditationEntry from "@/modules/ResearcherAccreditationEntry";
import ResearcherEducationEntry from "@/modules/ResearcherEducationEntry";
// import ResearcherEmploymentEntry from "@/modules/ResearcherEmploymentEntry";
import ResearcherProjectEntry from "@/modules/ResearcherProjectEntry";
import ResearcherTrainingEntry from "@/modules/ResearcherTrainingEntry";
import ResearcherProfessionalRegistrationsEntry from "@/modules/ResearcherProfessionalRegistrationsEntry";
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
  // const employments = data.getEmployments?.data;
  const educations = data.getEducations?.data;
  const projects = data.getUserApprovedProjects?.data;
  const trainings = data.getTrainings?.data;
  const professionalRegistrations =
    data.getProfessionalRegistrations?.data?.data;

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
            <Message severity="info">{t("noAccreditationsFound")}</Message>
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
            <Message severity="info">{t("noEducationsFound")}</Message>
          )}
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
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
            <Message severity="info">{t("noEmploymentsFound")}</Message>
          )}
        </AccordionDetails>
      </Accordion> */}
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
            <Message severity="info">{t("noProjectsFound")}</Message>
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
            <Message severity="info">{t("noTrainingsFound")}</Message>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          aria-controls="professional-registrations-content"
          id="professional-registrations-header"
          expandIcon={<ExpandMoreIcon />}>
          {t("professionalRegistrations")}
        </AccordionSummary>
        <AccordionDetails>
          {professionalRegistrations?.length ? (
            professionalRegistrations.map(professionalRegistration => (
              <ResearcherProfessionalRegistrationsEntry
                data={professionalRegistration}
              />
            ))
          ) : (
            <Message severity="info">
              {t("noProfessionalRegistrationsFound")}
            </Message>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
