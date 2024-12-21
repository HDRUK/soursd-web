import Form from "@/components/Form";
import FormSection from "@/components/FormSection";
import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import ResearcherAccreditationEntry from "@/modules/ResearcherAccreditationEntry";
import ResearcherEducationEntry from "@/modules/ResearcherEducationEntry";
import ResearcherEmploymentEntry from "@/modules/ResearcherEmploymentEntry";
import { useTranslations } from "next-intl";
import HistoriesSection from "../HistoriesSection";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Experience() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const histories = useStore(store => store.config.histories);

  return (
    <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
      <Form>
        <FormSection heading={tProfile("accreditations")}>
          <HistoriesSection
            type="accreditations"
            count={histories?.accreditations?.length}>
            {histories?.accreditations?.map(item => (
              <ResearcherAccreditationEntry data={item} />
            ))}
          </HistoriesSection>
        </FormSection>
        <FormSection heading={tProfile("education")}>
          <HistoriesSection
            type="education"
            count={histories?.education?.length}>
            {histories?.education?.map(item => (
              <ResearcherEducationEntry data={item} />
            ))}
          </HistoriesSection>
        </FormSection>
        <FormSection heading={tProfile("employment")}>
          <HistoriesSection
            type="employments"
            count={histories?.employments?.length}>
            {histories?.employments?.map(item => (
              <ResearcherEmploymentEntry data={item} />
            ))}
          </HistoriesSection>
        </FormSection>
      </Form>
    </PageGuidance>
  );
}
