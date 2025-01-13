"use client";
import { useStore } from "@/data/store";
import { PatchOrganisationPayload } from "@/services/organisations";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import useFormFromConfig from "@/hooks/useFormFromConfig";
import RenderFormFields from "@/components/RenderFormFields";
import { generateDelegatesFormFieldsConfig } from "../../../consts/form";

export interface DelegatesFormValues {
  department_name: string;
  delegate_full_name: string;
  delegate_job_title: string;
  delegate_email: string;
}

export interface DelegatesFormProps {
  onSubmit: (fields: Partial<PatchOrganisationPayload>) => void;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
export default function DelegatesForm({ onSubmit }: DelegatesFormProps) {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const organisation = useStore(state => state.config.organisation);

  const departments = organisation?.departments || [];
  const filteredDepartments = departments.map(department => ({
    label: department.name,
    value: department.id,
  }));

  const formFieldsConfig = useMemo(
    () => generateDelegatesFormFieldsConfig(tForm, filteredDepartments),
    [tForm, organisation]
  );

  const { control, handleSubmit } =
    useFormFromConfig<Partial<PatchOrganisationPayload>>(formFieldsConfig);

  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}>
      <RenderFormFields control={control} config={formFieldsConfig} />
    </Box>
  );
}
