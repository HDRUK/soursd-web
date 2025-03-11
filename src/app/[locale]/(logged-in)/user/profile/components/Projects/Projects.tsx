import Form from "@/components/Form";
import FormSection from "@/components/FormSection";
import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import {
  PageBody,
  PageBodyContainer,
  PageGuidance,
  PageSection,
} from "@/modules";
import ResearcherProjectEntry from "@/modules/ResearcherProjectEntry";
import { useTranslations } from "next-intl";
import HistoriesSection from "../HistoriesSection";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Experience() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const histories = useStore(store => store.config.histories);

  return (
    <PageBodyContainer>
      <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
        <PageBody>
          <PageSection>
            <Form>
              {() => (
                <FormSection heading={tProfile("projects")}>
                  <HistoriesSection
                    type="approvedProjects"
                    count={histories?.approvedProjects?.length}>
                    {histories?.approvedProjects?.map(item => (
                      <ResearcherProjectEntry data={item} />
                    ))}
                  </HistoriesSection>
                </FormSection>
              )}
            </Form>
          </PageSection>
        </PageBody>
      </PageGuidance>
    </PageBodyContainer>
  );
}
