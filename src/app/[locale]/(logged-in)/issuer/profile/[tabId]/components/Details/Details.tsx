"use client";

import ContactLink from "@/components/ContactLink";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import { Message } from "@/components/Message";
import Postit from "@/components/Postit";
import yup from "@/config/yup";
import { useStore } from "@/data/store";
import { PatchUserPayload } from "@/services/users";
import patchUser from "@/services/users/patchUser";
import { Issuer } from "@/types/application";
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
  email: string;
  idvt_required: boolean;
}

export interface DetailsProps {
  issuer: Issuer;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "IssuerProfile";

export default function Details({ issuer }: DetailsProps) {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const [getUser, setUser] = useStore(state => [state.getUser, state.setUser]);
  const user = getUser();

  const mdBreakpoint = theme.breakpoints.down("md");

  const {
    mutateAsync: mutateUpdateAsync,
    isError: isUpdateError,
    isPending: isUpdateLoading,
    error: updateError,
  } = useMutation({
    mutationKey: ["patchUser"],
    mutationFn: (payload: PatchUserPayload) =>
      patchUser(user?.id, payload, {
        error: {
          message: "submitError",
        },
      }),
  });

  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const handleDetailsSubmit = useCallback(
    async (payload: DetailsFormValues) => {
      const { name, email } = payload;
      const names = name.split(/: (.+)?/, 2);

      if (user?.id) {
        const request = {
          ...user,
          first_name: names[0],
          last_name: names[1],
          email,
        };

        await mutateUpdateAsync(request);

        setUser(request);

        queryClient.refetchQueries({
          queryKey: ["getIssuer"],
        });

        // Update issuer here
      }
    },
    []
  );

  const schema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required(tForm("nameRequiredInvalid")),
        email: yup
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
      name: `${user?.first_name} ${user?.last_name}`,
      email: user?.email,
      idvt_required: issuer.idvt_required,
    },
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = methods;

  const nameProps = register("name");
  const emailProps = register("email");

  return (
    <>
      <Postit sx={{ mx: "auto", mb: 7 }}>
        <Typography variant="h4">
          {tProfile("uniqueIdentifierTitle")}
        </Typography>
        <Typography
          sx={{
            fontSize: theme.typography.h4.fontSize,
            fontWeight: 500,
          }}>
          {issuer.unique_identifier}
        </Typography>
        <Typography>{tProfile("uniqueIdentifierCaption")}</Typography>
      </Postit>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleDetailsSubmit)} autoComplete="off">
          <Grid container rowSpacing={3}>
            {isUpdateError && (
              <Grid item xs={12}>
                <Message severity="error" sx={{ mb: 3 }}>
                  {tProfile.rich(updateError, {
                    contactLink: ContactLink,
                  })}
                </Message>
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("name")}
                error={errors.name}
                id="name">
                <TextField
                  {...nameProps}
                  size="small"
                  placeholder={tForm("namePlaceholder")}
                  sx={{ width: "500px" }}
                />
              </FormControlHorizontal>
            </Grid>
            <Grid item xs={12}>
              <FormControlHorizontal
                label={tForm("contactEmail")}
                error={errors.email}
                id="email">
                <TextField
                  {...emailProps}
                  size="small"
                  placeholder={tForm("contactEmailPlaceholder")}
                  sx={{
                    width: "500px",
                  }}
                />
              </FormControlHorizontal>
            </Grid>
            <Grid item xs={12}>
              <IdvtSection
                switchProps={register("idvt_required")}
                sx={{
                  ml: "215px",
                  maxWidth: "600px",
                  [mdBreakpoint]: {
                    ml: 0,
                    maxWidth: "initial",
                  },
                }}
              />
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
