"use client";

import ContactLink from "@/components/ContactLink";
import Form from "@/components/Form/Form";
import FormActions from "@/components/FormActions";
import Checkbox from "@mui/material/Checkbox";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import React, { useMemo } from "react";
import yup from "@/config/yup";
import { VALIDATION_CHARITY_ID, VALIDATION_ROR_ID } from "@/consts/form";
import { useStore } from "@/data/store";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import SelectCountry from "@/components/SelectCountry";
import FormFieldArray from "@/components/FormFieldArray";
import usePatchOrganisation from "../../../hooks/usePatchOrganisation";

export interface DigitalIdentifiersFormValues {
  companies_house_no: string;
  sector_id: number;
  charity_registration_id: string;
  ror_id: string;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function DigitalIdentifiers() {
  const { organisation, setOrganisation } = useStore(state => {
    return {
      organisation: state.config.organisation,
      setOrganisation: state.setOrganisation,
    };
  });
  const {
    isError,
    isPending: isLoading,
    error,
    onSubmit,
  } = usePatchOrganisation({
    id: organisation?.id,
    organisation,
    setOrganisation,
  });

  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const schema = useMemo(
    () =>
      yup.object().shape({
        sector_id: yup.number().required(tForm("sectorIdRequiredInvalid")),
        isCharity: yup.boolean(),
        charities: yup.array().when("isCharity", {
          is: true,
          then: schema =>
            schema
              .of(
                yup.object().shape({
                  registration_id: yup
                    .string()
                    .required(tForm("charityRegistrationIdRequiredInvalid"))
                    .matches(
                      VALIDATION_CHARITY_ID,
                      tForm("charityRegistrationIdFormatInvalid")
                    ),
                  country: yup
                    .string()
                    .required(tForm("charityCountryRequired")),
                })
              )
              .min(1, tForm("atLeastOneCharityRequired")),
          otherwise: schema => schema.notRequired(),
        }),
        ror_id: yup
          .string()
          .required(tForm("rorIdRequiredInvalid"))
          .matches(VALIDATION_ROR_ID, tForm("rorIdFormatInvalid")),
      }),
    []
  );

  const formOptions = {
    defaultValues: {
      companies_house_no: organisation?.companies_house_no,
      sector_id: organisation?.sector_id,
      charities: organisation?.charities.map(
        ({ country, registration_id }) => ({ country, registration_id })
      ),
      isCharity: organisation?.charities && organisation.charities.length > 0,
      ror_id: organisation?.ror_id,
    },
    error:
      isError &&
      tProfile.rich(error, {
        contactLink: ContactLink,
      }),
  };

  return (
    <Form schema={schema} onSubmit={onSubmit} {...formOptions}>
      {({ watch, setValue }) => {
        const isCharity = watch("isCharity");

        if (!isCharity) {
          setValue("charities", [], { shouldValidate: true });
        }

        return (
          <>
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <FormControlHorizontal
                  name="companies_house_no"
                  renderField={fieldProps => <TextField {...fieldProps} />}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlHorizontal
                  name="isCharity"
                  label={tForm("isCharity")}
                  renderField={fieldProps => (
                    <Checkbox {...fieldProps} checked={fieldProps.value} />
                  )}
                />
              </Grid>

              {watch("isCharity") && (
                <Grid item xs={12}>
                  <FormControlHorizontal
                    displayLabel={false}
                    displayPlaceholder={false}
                    labelMd={0}
                    contentMd={12}
                    name="charities"
                    renderField={fieldProps => (
                      <FormFieldArray<FormData>
                        name={fieldProps.name}
                        boxSx={{
                          display: "grid",
                          p: 0,
                          gridTemplateColumns: "2fr 3fr 1fr",
                        }}
                        initialRowCount={1}
                        minimumRows={1}
                        createNewRow={() => ({
                          registration_id: "",
                          country: "United Kingdom",
                        })}
                        renderField={(field, index) => (
                          <React.Fragment key={field.name}>
                            <FormControlHorizontal
                              displayLabel
                              label={tForm("country")}
                              labelMd={0}
                              contentMd={12}
                              name={`charities.${index}.country`}
                              placeholder="Country"
                              renderField={({ value, onChange, ...rest }) => (
                                <SelectCountry
                                  useCountryCode={false}
                                  value={value}
                                  onChange={onChange}
                                  {...rest}
                                />
                              )}
                            />
                            <FormControlHorizontal
                              displayLabel
                              label={tForm("charityRegistrationId")}
                              labelMd={0}
                              contentMd={12}
                              name={`charities.${index}.registration_id`}
                              placeholder={tForm(
                                "charityRegistrationIdPlaceholder"
                              )}
                              renderField={fieldProps => (
                                <TextField {...fieldProps} />
                              )}
                            />
                          </React.Fragment>
                        )}
                      />
                    )}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <FormControlHorizontal
                  name="ror_id"
                  renderField={fieldProps => <TextField {...fieldProps} />}
                />
              </Grid>
            </Grid>

            <FormActions>
              <LoadingButton
                loading={isLoading}
                type="submit"
                endIcon={<SaveIcon />}>
                {tProfile("submitButton")}
              </LoadingButton>
            </FormActions>
          </>
        );
      }}
    </Form>
  );
}
