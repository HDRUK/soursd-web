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
import GoogleAutocomplete from "@/components/GoogleAutocomplete";
import SelectCountry from "@/components/SelectCountry";

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
      {({ setValue }) => {
        const handleFindAddress = (address: AddressFields) => {
          Object.entries(address).forEach(([key, value]) => {
            setValue(`subsidiary_address.${key}`, value ?? "", {
              shouldDirty: true,
              shouldValidate: true,
            });
          });
        };

        return (
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
                <Grid item xs={12}>
                  <FormControl
                    name="subsidiary_address"
                    renderField={fieldProps => (
                      <GoogleAutocomplete
                        name="subsidiary_address"
                        onAddressSelected={value => {
                          handleFindAddress(value as AddressFields);
                          return value;
                        }}
                        textFieldProps={{
                          size: "small",
                        }}
                        fullWidth
                        placeholder={t("subsidiaryAddressPlaceholder")}
                        {...fieldProps}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    name="subsidiary_address.address_1"
                    label={t("address1")}
                    renderField={fieldProps => (
                      <TextField {...fieldProps} placeholder="" />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    name="subsidiary_address.address_2"
                    label={t("address2")}
                    renderField={fieldProps => (
                      <TextField {...fieldProps} placeholder="" />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    name="subsidiary_address.town"
                    label={t("town")}
                    renderField={fieldProps => (
                      <TextField {...fieldProps} placeholder="" />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    name="subsidiary_address.county"
                    label={t("county")}
                    renderField={fieldProps => (
                      <TextField {...fieldProps} placeholder="" />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    name="subsidiary_address.country"
                    label={t("country")}
                    renderField={fieldProps => (
                      <SelectCountry
                        useCountryCode={false}
                        {...fieldProps}
                        value={fieldProps.value}
                        onChange={fieldProps.onChange}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    name="subsidiary_address.postcode"
                    label={t("postcode")}
                    renderField={fieldProps => (
                      <TextField {...fieldProps} placeholder="" />
                    )}
                  />
                </Grid>

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
        );
      }}
    </Form>
  );
}
