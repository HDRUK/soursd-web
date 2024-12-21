import Form from "@/components/Form";
import FormSection from "@/components/FormSection";
import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import ResearcherTrainingEntry from "@/modules/ResearcherTrainingEntry";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Training() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const trainings = useStore(state => state.config.histories?.training);

  return (
    <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
      <Form>
        <FormSection heading={tProfile("training")}>
          {trainings?.map(training => (
            <ResearcherTrainingEntry data={training} />
          ))}
        </FormSection>
      </Form>
    </PageGuidance>
  );
}
