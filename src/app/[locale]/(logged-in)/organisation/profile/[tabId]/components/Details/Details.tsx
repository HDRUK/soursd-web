"use client";

import ContactLink from "@/components/ContactLink";
import Guidance from "@/components/Guidance";
import { Message } from "@/components/Message";
import yup from "@/config/yup";
import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PatchUserPayload } from "@/services/users";
import patchUser from "@/services/users/patchUser";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { FormControl, FormHelperText, Grid, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

export interface DetailsFormValues {
  first_name: string;
  last_name: string;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

export default function Details() {
  const [getUser, setUser] = useStore(state => [state.getUser, state.setUser]);
  const user = getUser();

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
          message: "patchUserError",
        },
      }),
  });

  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const handleDetailsSubmit = useCallback(
    async (payload: DetailsFormValues) => {
      if (user?.id) {
        const request = {
          ...user,
          ...payload,
        };

        await mutateUpdateAsync(request);

        setUser(request);
      }
    },
    [user]
  );

  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string().required(tForm("firstNameRequiredInvalid")),
        last_name: yup.string().required(tForm("lastNameRequiredInvalid")),
      }),
    []
  );

  const methods = useForm<DetailsFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
    },
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = methods;

  return (
    <Guidance {...mockedPersonalDetailsGuidanceProps}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleDetailsSubmit)} autoComplete="off">
          <Grid container rowSpacing={3} md={8}>
            <Grid item xs={12}>
              {isUpdateError && (
                <Message severity="error" sx={{ mb: 3 }}>
                  {tProfile.rich(updateError, {
                    contactLink: ContactLink,
                  })}
                </Message>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControl error={!!errors.first_name} size="small" fullWidth>
                <TextField
                  {...register("first_name")}
                  size="small"
                  placeholder={tForm("firstNamePlaceholder")}
                  label={<>{tForm("firstName")}</>}
                />
                {errors.first_name && (
                  <FormHelperText>{errors.first_name.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl error={!!errors.last_name} size="small" fullWidth>
                <TextField
                  {...register("last_name")}
                  size="small"
                  placeholder={tForm("lastNamePlaceholder")}
                  label={<>{tForm("lastName")}</>}
                />
                {errors.last_name && (
                  <FormHelperText>{errors.last_name.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<SaveIcon />}
            loading={isUpdateLoading}
            sx={{ mt: 5 }}>
            {tProfile("updateUserButton")}
          </LoadingButton>
        </form>
      </FormProvider>
    </Guidance>
  );
}
