"use client";

import { useStore } from "@/data/store";
import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import { PageBody, PageSection } from "@/modules";
import PageGuidance from "@/modules/PageGuidance";
import ProjectsSafeSettingsDetails from "@/modules/ProjectsSafeSettingsDetails";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "CustodianProfile";

export default function ProjectsSafeData() {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const project = useStore(state => state.getProject());

  return (
    <PageGuidance {...mockedSafeProjectGuidanceProps}>
      <PageBody heading={t("safeSettings")}>
        <PageSection>
          <ProjectsSafeSettingsDetails
            projectDetailsData={project.project_detail}
          />
        </PageSection>
      </PageBody>
    </PageGuidance>
  );
}
