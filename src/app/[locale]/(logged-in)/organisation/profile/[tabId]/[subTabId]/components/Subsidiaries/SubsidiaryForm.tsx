"use client";

import FormActions from "@/components/FormActions";
import FormControl from "@/components/FormControlWrapper";
import FormSection from "@/components/FormSection";
import yup from "@/config/yup";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { AddressFields, Subsidiary } from "@/types/application";
import { useMemo } from "react";
import Form from "@/components/Form";
import AddressForm from "@/components/AddressForm";

export interface SubsidiaryFormValues {
  subsidiary_name: string;
  subsidiary_address: AddressFields;
  subsidiary_website?: string;
}

export interface SubsidiaryFormProps {
  onSubmit: (formData: SubsidiaryFormValues) => void;
  isLoading?: boolean;
  defaultValues?: Subsidiary;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
export default function SubsidiaryForm({
  onSubmit,
  isLoading = true,
  defaultValues,
}: SubsidiaryFormProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const schema = useMemo(
    () =>
      yup.object().shape({
        subsidiary_name: yup.string().required(t("subsidiaryNameRequired")),
        subsidiary_address: yup.object().shape({
          postcode: yup.string().required(t("postcodeRequiredInvalid")),
          address_1: yup.string().required(t("address1RequiredInvalid")),
          address_2: yup.string().nullable(),
          town: yup.string().required(t("townRequiredInvalid")),
          county: yup.string().nullable(),
          country: yup.string().nullable(),
        }),
        subsidiary_website: yup.string(),
      }),
    [t]
  );

  const formOptions = {
    defaultValues: {
      subsidiary_name: defaultValues?.name ?? "",
      subsidiary_address: {
        postcode: defaultValues?.postcode ?? "",
        address_1: defaultValues?.address_1 ?? "",
        address_2: defaultValues?.address_2 ?? "",
        town: defaultValues?.town ?? "",
        county: defaultValues?.county ?? "",
        country: defaultValues?.country ?? "United Kingdom",
      } as AddressFields,
      subsidiary_website: "",
    },
  };

  return (
    <Form sx={{ mt: 1 }} schema={schema} onSubmit={onSubmit} {...formOptions}>
      <>
        <FormSection heading={t("addSubsidiary")}>
          <Grid
            container
            rowSpacing={3}
            sx={{ width: "100%", justifyContent: "flex-start" }}>
            <Grid item xs={12}>
              <FormControl
                name="subsidiary_name"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>

            <AddressForm name="subsidiary_address" />

            <Grid item xs={12}>
              <FormControl
                name="subsidiary_website"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>
          </Grid>
        </FormSection>
        <FormActions>
          <LoadingButton loading={isLoading} type="submit">
            {t("save")}
          </LoadingButton>
        </FormActions>
      </>
    </Form>
  );
}
