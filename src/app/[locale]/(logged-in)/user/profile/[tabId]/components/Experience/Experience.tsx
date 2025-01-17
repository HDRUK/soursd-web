import React, { useCallback } from "react";
import FormSection from "@/components/FormSection";
import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import ResearcherAccreditationEntry from "@/modules/ResearcherAccreditationEntry";
import ResearcherEducationEntry from "@/modules/ResearcherEducationEntry";
import ResearcherEmploymentEntry from "@/modules/ResearcherEmploymentEntry";
import { useTranslations } from "next-intl";
import { PostEmploymentsPayload } from "@/services/employments/types";
import HistoriesSection from "../HistoriesSection";
import EmploymentsForm from "./EmploymentsForm";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Experience() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const histories = useStore(state => state.config.histories);
  const setHistories = useStore(state => state.setHistories);
  const getHistories = useStore(state => state.getHistories);

  // When adding implementation is added for accreditations and education, this will need to be updated to be generic
  const onSubmit = useCallback(
    async (employment: PostEmploymentsPayload) => {
      try {
        const histories = getHistories();
        const updatedHistories = {
          ...histories,
          employments: [...histories.employments, employment],
        };
        if (updatedHistories) {
          setHistories(updatedHistories);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [getHistories, setHistories]
  );

  return (
    <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
      <FormSection
        heading={tProfile("accreditations")}
        sx={{ marginBottom: "16px" }}>
        <HistoriesSection
          type="accreditations"
          count={histories?.accreditations?.length}>
          {histories?.accreditations?.map(item => (
            <ResearcherAccreditationEntry data={item} />
          ))}
        </HistoriesSection>
      </FormSection>
      <FormSection
        heading={tProfile("education")}
        sx={{ marginBottom: "16px" }}>
        <HistoriesSection type="education" count={histories?.education?.length}>
          {histories?.education?.map(item => (
            <ResearcherEducationEntry data={item} />
          ))}
        </HistoriesSection>
      </FormSection>
      <FormSection heading={tProfile("employment")}>
        <EmploymentsForm onSubmit={onSubmit} />
        <HistoriesSection
          type="employments"
          count={histories?.employments.length}>
          {histories?.employments.map(item => (
            <ResearcherEmploymentEntry data={item} />
          ))}
        </HistoriesSection>
      </FormSection>
    </PageGuidance>
  );
}
