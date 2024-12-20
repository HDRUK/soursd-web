"use client";

import Form from "@/components/Form/Form";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormSection from "@/components/FormSection";
import GoogleAutocomplete, {
  AddressFields,
} from "@/components/GoogleAutocomplete";
import yup from "@/config/yup";
import { VALIDATION_CE_CERTIFICATION_NUMBER } from "@/consts/form";
import { useStore } from "@/data/store";
import { QueryState } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import {
  useController,
  FormProvider,
  useForm,
  UseFormReturn,
  Control,
  FieldValues,
} from "react-hook-form";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo, ComponentType } from "react";
import { generateSchema, generateDefaultValues } from "@/utils/yup";
import { FormFieldConfig, FormFieldsConfig } from "@/types/forms";

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
}

export interface DetailsFormProps {
  onSubmit: (fields: DetailsFormValues) => void;
  queryState: QueryState;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function SubsidiariesForm({
  onSubmit,
  queryState,
}: DetailsFormProps) {
  // const { organisation, sectors } = useStore(state => state.config);

  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const formFieldsConfig = useMemo(
    () => generateSubsidiariesFormFieldsConfig(tForm),
    [tForm]
  );

  const { control } = useFormFromConfig<DetailsFormValues>(formFieldsConfig);

  console.log(formFieldsConfig);

  return <RenderFormFields control={control} config={formFieldsConfig} />;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormSection heading="Organisation persistent identifiers">
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("ce_certification_num")}
                error={errors.companies_house_no}
                id="ce_certification_num">
                <TextField
                  {...register("ce_certification_num")}
                  placeholder={tForm("ce_certification_num")}
                />
              </FormControlHorizontal>
            </Grid>
          </Grid>
        </FormSection>

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
      </Form>
    </FormProvider>
  );
}
