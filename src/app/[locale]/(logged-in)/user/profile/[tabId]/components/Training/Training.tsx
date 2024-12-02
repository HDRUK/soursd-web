import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Training() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <PageGuidance
      title={tProfile("training")}
      {...mockedPersonalDetailsGuidanceProps}>
      [Content]
    </PageGuidance>
  );
}
