import { useStore } from "@/data/store";
import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import { PageBody, PageSection } from "@/modules";
import PageGuidance from "@/modules/PageGuidance";
import ProjectsSafeOutputsForm from "@/modules/ProjectsSafeOutputsForm";
import { ProjectDetails } from "@/types/application";
import { createProjectDetailDefaultValues } from "@/utils/form";
import { pick } from "@/utils/json";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

const NAMESPACE_TRANSLATION = "CustodianProfile";

const PAYLOAD_FIELDS = [
  "datasets",
  "data_sensitivity_level",
  "legal_basis_for_data_article6",
  "duty_of_confidentiality",
  "national_data_optout",
  "request_frequency",
  "dataset_linkage_description",
  "data_minimisation",
  "data_use_description",
  "access_date",
];

export default function ProjectsSafeOutputs() {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const project = useStore(state => state.getProject());

  const defaultValues = useMemo<ProjectDetails>(
    pick(
      createProjectDetailDefaultValues(project.project_detail || {}),
      PAYLOAD_FIELDS
    ),
    []
  );

  return (
    <PageGuidance {...mockedSafeProjectGuidanceProps}>
      <PageBody heading={t("safeData")}>
        <PageSection>
          <ProjectsSafeOutputsForm defaultValues={defaultValues} isReadOnly />
        </PageSection>
      </PageBody>
    </PageGuidance>
  );
}
