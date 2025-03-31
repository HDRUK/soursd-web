"use client";

import { useStore } from "@/data/store";
import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import { PageBody, PageGuidance, PageSection } from "@/modules";
import ProjectsSafeSettingsForm from "@/modules/ProjectsSafeSettingsForm";
import { ProjectDetails } from "@/types/application";
import { createProjectDetailDefaultValues } from "@/utils/form";
import { pick } from "@/utils/json";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

const NAMESPACE_TRANSLATION = "CustodianProfile";

const PAYLOAD_FIELDS = ["access_type", "data_privacy"];

export default function ProjectsSafeProject() {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const project = useStore(state => state.getProject());

  const defaultValues = useMemo<ProjectDetails>(
    () =>
      pick(
        createProjectDetailDefaultValues(project.project_detail || {}),
        PAYLOAD_FIELDS
      ),
    []
  );

  return (
    <PageGuidance {...mockedSafeProjectGuidanceProps}>
      <PageBody heading={t("safeSettings")}>
        <PageSection>
          <ProjectsSafeSettingsForm defaultValues={defaultValues} disabled />
        </PageSection>
      </PageBody>
    </PageGuidance>
  );
}
