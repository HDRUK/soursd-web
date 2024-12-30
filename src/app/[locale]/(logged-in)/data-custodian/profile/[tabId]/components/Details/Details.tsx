"use client";

import ApplicationLink from "@/components/ApplicationLink";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormField from "@/components/FormField";
import { Message } from "@/components/Message";
import Postit from "@/components/Postit";
import yup from "@/config/yup";
import { patchCustodian, PatchCustodianPayload } from "@/services/custodians";
import { Custodian } from "@/types/application";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField, Typography, useTheme } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
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

  const formOptions = {
    defaultValues: {
      name: custodian.name,
      contact_email: custodian.contact_email,
      idvt_required: custodian.idvt_required,
    },
    disabled: isUpdateLoading,
  };

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
      <Form
        schema={schema}
        {...formOptions}
        onSubmit={handleDetailsSubmit}
        autoComplete="off">
        {({ formState: { errors }, register }) => (
          <>
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
                  id="name"
                  error={errors.name}
                  renderField={fieldProps => (
                    <FormField component={TextField} {...fieldProps} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlHorizontal
                  id="contact_email"
                  error={errors.contact_email}
                  renderField={fieldProps => (
                    <FormField component={TextField} {...fieldProps} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlHorizontal
                  renderField={() => (
                    <IdvtSection switchProps={register("idvt_required")} />
                  )}
                />
              </Grid>
            </Grid>
            <FormActions>
              <LoadingButton
                type="submit"
                endIcon={<SaveIcon />}
                loading={isUpdateLoading}>
                {tProfile("submitButton")}
              </LoadingButton>
            </FormActions>
          </>
        )}
      </Form>
    </>
  );
}
