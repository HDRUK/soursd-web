"use client";

import ApplicationLink from "@/components/ApplicationLink";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import { Message } from "@/components/Message";
import Postit from "@/components/Postit";
import yup from "@/config/yup";
import { patchCustodian, PatchCustodianPayload } from "@/services/custodians";
import { Custodian } from "@/types/application";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField, Typography, useTheme } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import IdvtSection from "../IdvtSection";

export interface DetailsFormValues {
  name: string;
  contact_email: string;
  idvt_required: boolean;
}

export interface DetailsProps {
  custodian: Custodian;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

export default function Details({ custodian }: DetailsProps) {
  const queryClient = useQueryClient();
  const theme = useTheme();

  const {
    mutateAsync: mutateUpdateAsync,
    isError: isUpdateError,
    isPending: isUpdateLoading,
    error: updateError,
  } = useMutation({
    mutationKey: ["patchCustodian", custodian.id],
    mutationFn: (payload: PatchCustodianPayload) =>
      patchCustodian(custodian.id, payload, {
        error: {
          message: "submitError",
        },
      }),
  });

  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const handleDetailsSubmit = useCallback(
    async (payload: DetailsFormValues) => {
      await mutateUpdateAsync({
        ...custodian,
        ...payload,
      });

      queryClient.refetchQueries({
        queryKey: ["getCustodian", custodian.id],
      });
    },
    []
  );

  const schema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required(tForm("nameRequiredInvalid")),
        contact_email: yup
          .string()
          .required(tForm("contactEmailRequiredInvalid"))
          .email(tForm("contactEmailFormatInvalid")),
        idvt_required: yup.boolean(),
      }),
    []
  );

  const methods = useForm<DetailsFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: custodian.name,
      contact_email: custodian.contact_email,
      idvt_required: custodian.idvt_required,
    },
    disabled: isUpdateLoading,
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = methods;

  const nameProps = register("name");
  const contactEmailProps = register("contact_email");

  return (
    <>
      <Postit sx={{ mx: "auto", mb: 7 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {tProfile("uniqueIdentifierTitle")}
        </Typography>
        <Typography
          sx={{
            fontSize: theme.typography.h4.fontSize,
            fontWeight: 500,
            mb: 1,
          }}>
          {custodian.unique_identifier}
        </Typography>
        <Typography>{tProfile("uniqueIdentifierCaption")}</Typography>
      </Postit>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleDetailsSubmit)} autoComplete="off">
          <Grid container rowSpacing={3} sx={{ maxWidth: "800px" }}>
            {isUpdateError && (
              <Grid item xs={12}>
                <Message severity="error" sx={{ mb: 3 }}>
                  {tProfile.rich(updateError, {
                    applicationLink: ApplicationLink,
                  })}
                </Message>
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("name")}
                error={errors.name}
                id="name"
                disabled>
                <TextField
                  {...nameProps}
                  size="small"
                  placeholder={tForm("namePlaceholder")}
                />
              </FormControlHorizontal>
            </Grid>
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("contactEmail")}
                error={errors.contact_email}
                id="contact_email">
                <TextField
                  {...contactEmailProps}
                  size="small"
                  placeholder={tForm("contactEmailPlaceholder")}
                />
              </FormControlHorizontal>
            </Grid>
            <Grid item xs={12}>
              <FormControlHorizontal>
                <IdvtSection switchProps={register("idvt_required")} />
              </FormControlHorizontal>
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<SaveIcon />}
            loading={isUpdateLoading}
            sx={{ mt: 5 }}>
            {tProfile("submitButton")}
          </LoadingButton>
        </form>
      </FormProvider>
    </>
  );
}
