import React, { useCallback } from 'react';
import FormSection from "@/components/FormSection";
import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import ResearcherAccreditationEntry from "@/modules/ResearcherAccreditationEntry";
import ResearcherEducationEntry from "@/modules/ResearcherEducationEntry";
import ResearcherEmploymentEntry from "@/modules/ResearcherEmploymentEntry";
import { useTranslations } from "next-intl";
import HistoriesSection from "../HistoriesSection";
import EmploymentsForm from "./EmploymentsForm";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Experience() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const histories = useStore(state => state.config.histories);
  const setHistories = useStore(state => state.setHistories);
  const getHistories = useStore(state => state.getHistories);

  const onSubmit = useCallback(async () => {
    try {
      // Fetch the latest histories data
      const updatedHistories = getHistories();
      // Update the store with the new data
      if (updatedHistories) {
        setHistories(updatedHistories);
      }
    } catch (error) {
      console.error("Failed to update histories:", error);
    }
  }, [getHistories, setHistories]);

  return (
    <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
      <FormSection
        heading={tProfile("accreditations")}
        sx={{ marginBottom: "16px" }}>
        <HistoriesSection
          type="accreditations"
          count={histories?.accreditations?.length}>
          {histories?.accreditations?.map(item => (
            <ResearcherAccreditationEntry key={item.id ?? item._id} data={item} />
          ))}
        </HistoriesSection>
      </FormSection>
      <FormSection
        heading={tProfile("education")}
        sx={{ marginBottom: "16px" }}>
        <HistoriesSection type="education" count={histories?.education?.length}>
          {histories?.education?.map(item => (
            <ResearcherEducationEntry key={item.id ?? item._id} data={item} />
          ))}
        </HistoriesSection>
      </FormSection>
      <FormSection heading={tProfile("employment")}>
        <EmploymentsForm onSubmit={onSubmit}/>
        <HistoriesSection
          type="employments"
          count={histories?.employments?.length}>
          {histories?.employments?.map(item => (
            <ResearcherEmploymentEntry key={item.id ?? item._id} data={item} />
          ))}
        </HistoriesSection>
      </FormSection>
    </PageGuidance>
  );
}
