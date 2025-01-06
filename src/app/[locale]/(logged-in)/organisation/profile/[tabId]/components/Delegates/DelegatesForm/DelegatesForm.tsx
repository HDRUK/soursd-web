"use client";

import Form from "@/components/Form/Form";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormSection from "@/components/FormSection";
import GoogleAutocomplete, {
  AddressFields,
} from "@/components/GoogleAutocomplete";
import yup from "@/config/yup";
import {
  VALIDATION_EMAIL
} from "@/consts/form";
import { useStore } from "@/data/store";
import { QueryState } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { LoadingButton } from "@mui/lab";
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
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export interface DelegatesFormValues {
  department_name: string,
  delegate_full_name: string,
  delegate_job_title: string,
  delegate_email: string
}

export interface DelegatesFormProps {
  onSubmit: (fields: DelegatesFormValues) => void;
  queryState: QueryState;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function DelegatesForm({
  onSubmit,
  queryState,
}: DelegatesFormProps) {

  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const schema = useMemo(
    () =>
      yup.object().shape({
        department_name: yup
          .string()
          .required(tForm("organisationNameRequiredInvalid")),
        delegate_full_name: yup.string().required(tForm("address1RequiredInvalid")),
        delegate_job_title: yup.string().nullable(),
        delegate_email: yup.string().required(tForm("townRequiredInvalid"))
        .matches(
          VALIDATION_EMAIL,
          tForm("charityRegistrationIdFormatInvalid")
        ),
      }),
    []
  );

  const methods = useForm<DelegatesFormValues>({
    resolver: yupResolver(schema),
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = methods;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormSection heading="Organisation administrative delegate">
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("departmentName")}
                error={errors.organisation_name}
                id="organisation_name">
                <Select
                  {...register("department_name")}
                  size="small"
                />
              </FormControlHorizontal>
            </Grid>
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("delegateFullName")}
                error={errors.address_1}
                id="address_1">
                <TextField
                  {...register("delegate_full_name")}
                />
              </FormControlHorizontal>
            </Grid>
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("delegateJobTitle")}
                error={errors.address_2}
                id="address_2">
                <TextField
                  {...register("delegate_job_title")}
                />
              </FormControlHorizontal>
            </Grid>
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("delegateEmail")}
                error={errors.town}
                id="town">
                <TextField
                  {...register("delegate_email")}
                />
              </FormControlHorizontal>
            </Grid>
            </Grid>
          </FormSection>
        <Box sx={{textAlign: "right" }}>
          <LoadingButton
            loading={queryState.isLoading}
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<AddCircleOutlineIcon />}
            sx={{ mt: 5 }}>
            {tProfile("addAnother")}
          </LoadingButton>
        </Box>
      </Form>
    </FormProvider>
  );
}
