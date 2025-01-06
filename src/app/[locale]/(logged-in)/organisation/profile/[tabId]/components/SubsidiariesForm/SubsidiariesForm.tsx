"use client";

import { Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useStore } from "@/data/store";
import useFormFromConfig from "@/hooks/useFormFromConfig";
import RenderFormFields from "@/components/RenderFormFields";
import Form from "@/components/Form/Form";
import { QueryState } from "@/types/form";
import { LoadingButton } from "@mui/lab";

import { generateSubsidiariesFormFieldsConfig } from "../../consts/form";

export interface DetailsFormValues {
  organisation_name: string;
  address_1: string;
  address_2: string;
  town: string;
  county: string;
  country: string;
  postcode: string;
  companies_house_no: string;
  sector_id: number;
  charity_registration_id: string;
  ror_id: string;
  website: string;
  smb_status: boolean;
  subsidiaries: string[];
}

export interface DetailsFormProps {
  onSubmit: (fields: Partial<DetailsFormValues>) => void;
  queryState: QueryState;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function SubsidiariesForm({
  onSubmit,
  queryState,
}: DetailsFormProps) {
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const organisation = useStore(state => state.config.organisation);

  const formFieldsConfig = useMemo(
    () => generateSubsidiariesFormFieldsConfig(tForm, organisation),
    [tForm, organisation]
  );

  const { control, handleSubmit } =
    useFormFromConfig<DetailsFormValues>(formFieldsConfig);

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
      <Box sx={{ textAlign: "right" }}>
        <LoadingButton
          loading={queryState.isLoading}
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<SaveIcon />}
          sx={{ mt: 5 }}>
          {tProfile("submitButton")}
        </LoadingButton>
      </Box>
    </Box>
  );
}
