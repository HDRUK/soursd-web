"use client";

import ContactLink from "@/components/ContactLink";
import { Message } from "@/components/Message";
import OverlayCenter from "@/components/OverlayCenter";
import yup from "@/config/yup";
import { MAX_UPLOAD_SIZE_BYTES } from "@/consts/files";
import { VALIDATION_ORC_ID } from "@/consts/form";
import { useStore } from "@/data/store";
import useFileScanned from "@/hooks/useFileScanned/useFileScanned";
import useQueryRefetch from "@/hooks/useQueryRefetch";
import postFile from "@/services/files/postFile";
import { FilePayload } from "@/services/files/types";
import { getOrganisations } from "@/services/organisations";
import { PatchUserPayload } from "@/services/users";
import patchUser from "@/services/users/patchUser";
import { EntityType, FileType } from "@/types/api";
import { getLatestCV, isFileScanning } from "@/utils/file";
import { yupResolver } from "@hookform/resolvers/yup";
import { Check, Replay } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DetailsCV from "../DetailsCV";

export interface DetailsFormValues {
  first_name: string;
  last_name: string;
  orc_id: number | null;
  organisation_id: number;
  consent_scrape: boolean;
}

export interface DetailsProps {
  emailVerified?: boolean;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PERSONAL_DETAILS = "PersonalDetails";

export default function Details({ emailVerified }: DetailsProps) {
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
          message: "submitError",
        },
      }),
  });

  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tPersonalDetails = useTranslations(
    NAMESPACE_TRANSLATION_PERSONAL_DETAILS
  );
  const [isFileSizeTooBig, setIsFileSizeTooBig] = useState(false);

  const latestCV = getLatestCV(user?.registry.files);

  const { isNotInfected, isScanning } = useFileScanned(latestCV);

  const { refetch: refetchUser, cancel: refetchCancel } = useQueryRefetch({
    options: { queryKey: ["getUser", user?.id] },
  });

  useEffect(() => {
    if (isFileScanning(latestCV)) {
      refetchUser();
    } else {
      refetchCancel();
    }
  }, [JSON.stringify(latestCV)]);

  const {
    mutateAsync: mutateFileAsync,
    isError: isFileError,
    isPending: isFileLoading,
    error: fileError,
  } = useMutation({
    mutationKey: ["postFile"],
    mutationFn: (payload: () => FilePayload) => {
      return postFile(payload, {
        error: { message: "cvUploadFailed" },
      });
    },
  });

  const {
    isError: isGetOrganisationsError,
    isLoading: isGetOrganisationsLoading,
    data: organisationsData,
    error: organisationsError,
  } = useQuery({
    queryKey: ["getOrganisationsError"],
    queryFn: () =>
      getOrganisations({
        error: { message: "noData" },
      }),
  });

  const handleFileChange = useCallback(
    async ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
      setIsFileSizeTooBig(false);

      if (files) {
        if (files[0].size <= MAX_UPLOAD_SIZE_BYTES) {
          await mutateFileAsync(() => {
            const file = new FormData();

            file.append("file", files[0]);
            file.append("file_type", FileType.CV);
            file.append("entity_type", EntityType.RESEARCHER);

            return file;
          });

          refetchUser();
        } else {
          setIsFileSizeTooBig(true);
        }
      }
    },
    []
  );

  const handleDetailsSubmit = useCallback(
    async (payload: DetailsFormValues) => {
      console.log("******* USER", user);
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
        organisation_id: yup
          .string()
          .required(tForm("organisationNameRequiredInvalid")),
        orc_id: yup
          .string()
          .matches(
            new RegExp(`(${VALIDATION_ORC_ID.source})|^$`),
            tForm("orcIdFormatInvalid")
          )
          .when("consent_scrape", {
            is: true,
            then: () =>
              yup
                .string()
                .required(tForm("orcIdRequiredInvalid"))
                .matches(VALIDATION_ORC_ID, tForm("orcIdFormatInvalid")),
          })
          .nullable(),
        consent_scrape: yup.bool(),
      }),
    []
  );

  const methods = useForm<DetailsFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      orc_id: user?.orc_id,
      organisation_id: user?.organisation_id,
      consent_scrape: user?.consent_scrape,
    },
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = methods;

  if (isGetOrganisationsLoading) {
    return (
      <OverlayCenter sx={{ color: "#fff" }}>
        <CircularProgress color="inherit" />
      </OverlayCenter>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleDetailsSubmit)} autoComplete="off">
        <Grid container rowSpacing={3} md={8}>
          <Grid item xs={12}>
            {isGetOrganisationsError && (
              <Message severity="error" sx={{ mb: 3 }}>
                {tPersonalDetails.rich(organisationsError, {
                  contactLink: ContactLink,
                })}
              </Message>
            )}
            {isUpdateError && (
              <Message severity="error" sx={{ mb: 3 }}>
                {tPersonalDetails.rich(updateError, {
                  contactLink: ContactLink,
                })}
              </Message>
            )}
            {isFileError && (
              <Message severity="error" sx={{ mb: 3 }}>
                {tPersonalDetails.rich(fileError, {
                  contactLink: ContactLink,
                })}
              </Message>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl
              error={!!errors.organisation_id}
              size="small"
              fullWidth>
              <InputLabel id="organisation_id">
                {tForm("organisationName")}
              </InputLabel>
              <Select
                defaultValue=""
                {...register("organisation_id")}
                size="small"
                inputProps={{
                  "aria-label": tForm("organisationNameAriaLabel"),
                }}
                label={<>{tForm("organisationName")}</>}>
                {organisationsData?.data?.data.map(
                  ({ organisation_name, id }) => (
                    <MenuItem value={id} key={id}>
                      {organisation_name}
                    </MenuItem>
                  )
                )}
              </Select>
              {errors.organisation_id && (
                <FormHelperText>
                  {errors.organisation_id.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl error={!!errors.first_name} size="small" fullWidth>
              <TextField
                {...register("first_name")}
                size="small"
                placeholder={tForm("firstNamePlaceholder")}
                aria-label={tForm("firstName")}
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
                aria-label={tForm("lastName")}
                label={<>{tForm("lastName")}</>}
              />
              {errors.last_name && (
                <FormHelperText>{errors.last_name.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl error={!!errors.orc_id} size="small" fullWidth>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  width: "100%",
                }}>
                <TextField
                  {...register("orc_id")}
                  size="small"
                  placeholder={tForm("orcIdPlaceholder")}
                  label={<>{tForm("orcId")}</>}
                  fullWidth
                />
                <Tooltip title={tForm("whatIsTheOrcId")}>
                  <InfoIcon color="info" />
                </Tooltip>
              </Box>

              {errors.orc_id && (
                <FormHelperText>{errors.orc_id.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl error={!!errors.consent_scrape} size="small" fullWidth>
              <FormControlLabel
                control={<Checkbox {...register("consent_scrape")} />}
                label={tPersonalDetails("consentScrape")}
                aria-label={tPersonalDetails("consentScrapeAriaLabel")}
              />
              {errors.consent_scrape && (
                <FormHelperText>{errors.consent_scrape.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            Email verification:{" "}
            {emailVerified && (
              <Typography
                color="success.main"
                component="span"
                sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                {tPersonalDetails("verified")} <Check />
              </Typography>
            )}
            {!emailVerified && (
              <Button
                endIcon={<Replay />}
                color="error"
                variant="contained"
                size="small">
                {tPersonalDetails("pending")}
              </Button>
            )}
          </Grid>
          <Grid item md={12}>
            <DetailsCV
              fileName={latestCV?.name || tPersonalDetails("noCvUploaded")}
              isFileSizeTooBig={isFileSizeTooBig}
              isFileScanning={isScanning}
              isFileOk={isNotInfected}
              isFileUploading={isFileLoading}
              onFileChange={handleFileChange}
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
          {tPersonalDetails("submitButton")}
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
