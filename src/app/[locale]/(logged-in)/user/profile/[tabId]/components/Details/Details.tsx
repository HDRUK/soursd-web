import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import {
  PageBody,
  PageBodyContainer,
  PageGuidance,
  PageSection,
} from "@/modules";
import { useTranslations } from "next-intl";
import Completion from "../Completion";
import UserInfo from "../UserInfo";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Details() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <PageBodyContainer heading={tProfile("profile")}>
      <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
        <PageBody>
          <PageSection>
            <UserInfo />
          </PageSection>
          <PageSection>
            <Completion />
          </PageSection>
        </PageBody>
      </PageGuidance>
    </PageBodyContainer>
  );
}
