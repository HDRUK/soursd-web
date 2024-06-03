"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormControl, FormHelperText, Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import CVUpload from "../CVUpload";

interface ProfileFormValues {
  firstName: string;
  lastName: string;
}

const NAMESPACE_TRANSLATION_VALIDATION = "FormValidation";
const NAMESPACE_TRANSLATION_PERSONAL_DETAILS = "PersonalDetails";

export default function PersonalDetails() {
  const tValidation = useTranslations(NAMESPACE_TRANSLATION_VALIDATION);
  const tPersonalDetails = useTranslations(
    NAMESPACE_TRANSLATION_PERSONAL_DETAILS
  );

  const schema = useMemo(
    () =>
      yup.object().shape({
        firstName: yup
          .string()
          .required(tValidation("firstNameRequiredInvalid")),
        lastName: yup.string().required(tValidation("lastNameRequiredInvalid")),
      }),
    []
  );

  const methods = useForm<ProfileFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const handleFormSubmit = (data: ProfileFormValues) => {
    console.log("DATA", data);
  };

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={5}>
          <Grid item md={4}>
            <FormControl error={!!errors.firstName} size="small" fullWidth>
              <TextField
                {...register("firstName")}
                size="small"
                placeholder={tPersonalDetails("firstNamePlaceholder")}
                aria-label={tPersonalDetails("firstName")}
                label={<>{tPersonalDetails("firstName")} *</>}
              />
              {errors.firstName && (
                <FormHelperText>{errors.firstName.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={4}>
            <FormControl error={!!errors.lastName} size="small" fullWidth>
              <TextField
                {...register("lastName")}
                size="small"
                placeholder={tPersonalDetails("lastNamePlaceholder")}
                aria-label={tPersonalDetails("lastName")}
                label={<>{tPersonalDetails("lastName")} *</>}
              />
              {errors.lastName && (
                <FormHelperText>{errors.lastName.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={3}>
            <CVUpload />
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
