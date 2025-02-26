"use client";

import FormControl from "@/components/FormControlWrapper";
import { Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { AddressFields } from "@/types/application";
import GoogleAutocomplete from "@/components/GoogleAutocomplete";
import SelectCountry from "@/components/SelectCountry";

import { useFormContext } from "react-hook-form";

export interface AddressFormProps {
  name: string;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
export default function AddressForm({ name }: AddressFormProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const { setValue } = useFormContext();

  const handleFindAddress = (address: AddressFields) => {
    Object.entries(address).forEach(([key, value]) => {
      setValue(`${name}.${key}`, value ?? "", {
        shouldDirty: true,
        shouldValidate: true,
      });
    });
  };

  return (
    <>
      <Grid item xs={12}>
        <FormControl
          name={name}
          renderField={fieldProps => (
            <GoogleAutocomplete
              name={name}
              onAddressSelected={value => {
                handleFindAddress(value as AddressFields);
                return value;
              }}
              textFieldProps={{
                size: "small",
              }}
              fullWidth
              placeholder={t("addressPlaceholder")}
              {...fieldProps}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl
          name={`${name}.address_1`}
          label={t("address1")}
          renderField={fieldProps => (
            <TextField {...fieldProps} placeholder="" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl
          name={`${name}.address_2`}
          label={t("address2")}
          renderField={fieldProps => (
            <TextField {...fieldProps} placeholder="" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl
          name={`${name}.town`}
          label={t("town")}
          renderField={fieldProps => (
            <TextField {...fieldProps} placeholder="" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl
          name={`${name}.county`}
          label={t("county")}
          renderField={fieldProps => (
            <TextField {...fieldProps} placeholder="" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl
          name={`${name}.country`}
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
          name={`${name}.postcode`}
          label={t("postcode")}
          renderField={fieldProps => (
            <TextField {...fieldProps} placeholder="" />
          )}
        />
      </Grid>
    </>
  );
}
