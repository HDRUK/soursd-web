"use client";

import { useStore } from "@/data/store";
import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import { PageBody, PageSection } from "@/modules";
import PageGuidance from "@/modules/PageGuidance";
import ProjectsSafeOutputsDetails from "@/modules/ProjectsSafeOutputsDetails";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "CustodianProfile";
const NAMESPACE_TRANSLATION_FORM = "Form.SafeOutputs";

export default function ProjectsSafeData() {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const project = useStore(state => state.getProject());

  return (
    <PageGuidance {...mockedSafeProjectGuidanceProps}>
      <PageBody heading={t("safeOutputs")}>
        <PageSection>
          <ProjectsSafeOutputsDetails
            projectDetailsData={project.project_detail}
            tKey={NAMESPACE_TRANSLATION_FORM}
          />
        </PageSection>
      </PageBody>
    </PageGuidance>
  );
}
