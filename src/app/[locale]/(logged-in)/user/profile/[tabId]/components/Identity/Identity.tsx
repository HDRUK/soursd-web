"use client";

import ApplicationLink from "@/components/ApplicationLink";
import { Message } from "@/components/Message";
import OverlayCenter from "@/components/OverlayCenter";
import yup from "@/config/yup";
import { MAX_UPLOAD_SIZE_BYTES } from "@/consts/files";
import { VALIDATION_ORC_ID } from "@/consts/form";
import { UserProfileCompletionCategories } from "@/consts/user";
import { useStore } from "@/data/store";
import useFileScanned from "@/hooks/useFileScanned/useFileScanned";
import useQueryRefetch from "@/hooks/useQueryRefetch";
import useUserProfileCompletion from "@/hooks/useUserProfileCompletion";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import postFile from "@/services/files/postFile";
import { FilePayload } from "@/services/files/types";
import { getOrganisations } from "@/services/organisations";
import { EntityType, FileType } from "@/types/api";
import { getLatestCV, isFileScanning } from "@/utils/file";
import { yupResolver } from "@hookform/resolvers/yup";
import InfoIcon from "@mui/icons-material/Info";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import {
  Box,
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
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DetailsCV from "../DetailsCV";

export interface IdentityFormValues {
  first_name: string;
  last_name: string;
  orc_id: string | null;
  organisation_id: number;
  consent_scrape: boolean;
}

const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Identity() {
  const {
    update: updateCompletion,
    isError: isUpdateError,
    isLoading: isUpdateLoading,
    error: updateError,
  } = useUserProfileCompletion();

  const user = useStore(state => state.getUser());

  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const [isFileSizeTooBig, setIsFileSizeTooBig] = useState(false);

  const latestCV = getLatestCV(user?.registry?.files || []);

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

    return () => refetchCancel();
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

      if (files?.[0]) {
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
    async (fields: IdentityFormValues) => {
      if (user?.id) {
        const request = {
          ...user,
          ...fields,
        };

        updateCompletion(
          fields,
          UserProfileCompletionCategories.IDENTITY,
          request
        );
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

  const methods = useForm<IdentityFormValues>({
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
    watch,
  } = methods;

  if (isGetOrganisationsLoading) {
    return (
      <OverlayCenter sx={{ color: "#fff" }}>
        <CircularProgress color="inherit" />
      </OverlayCenter>
    );
  }

  return (
    <PageGuidance
      title={tProfile("identity")}
      {...mockedPersonalDetailsGuidanceProps}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleDetailsSubmit)} autoComplete="off">
          <Grid container rowSpacing={3} md={8}>
            <Grid item xs={12}>
              {isGetOrganisationsError && (
                <Message severity="error" sx={{ mb: 3 }}>
                  {tProfile.rich(organisationsError, {
                    applicationLink: ApplicationLink,
                  })}
                </Message>
              )}
              {isUpdateError && (
                <Message severity="error" sx={{ mb: 3 }}>
                  {tProfile.rich(updateError, {
                    applicationLink: ApplicationLink,
                  })}
                </Message>
              )}
              {isFileError && (
                <Message severity="error" sx={{ mb: 3 }}>
                  {tProfile.rich(fileError, {
                    applicationLink: ApplicationLink,
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
                  defaultValue={watch("organisation_id")}
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
              <FormControl
                error={!!errors.consent_scrape}
                size="small"
                fullWidth>
                <FormControlLabel
                  control={<Checkbox {...register("consent_scrape")} />}
                  label={tProfile("consentScrape")}
                  aria-label={tProfile("consentScrapeAriaLabel")}
                />
                {errors.consent_scrape && (
                  <FormHelperText>
                    {errors.consent_scrape.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item md={12}>
              <DetailsCV
                fileName={latestCV?.name || tProfile("noCvUploaded")}
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
            {tProfile("submitButton")}
          </LoadingButton>
        </form>
      </FormProvider>
    </PageGuidance>
  );
}
