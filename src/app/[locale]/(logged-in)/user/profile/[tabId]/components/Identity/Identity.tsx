"use client";

import ApplicationLink from "@/components/ApplicationLink";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormField from "@/components/FormField";
import FormSection from "@/components/FormSection";
import { Message } from "@/components/Message";
import OverlayCenter from "@/components/OverlayCenter";
import Text from "@/components/Text";
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
import InfoIcon from "@mui/icons-material/Info";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import DetailsCV from "../DetailsCV";

export interface IdentityFormValues {
  first_name: string;
  last_name: string;
  orc_id?: string | null;
  organisation_id: number;
  consent_scrape?: boolean;
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

  const user = useStore(state => state.config.user);

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
          .number()
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

  if (isGetOrganisationsLoading) {
    return (
      <OverlayCenter sx={{ color: "#fff" }}>
        <CircularProgress color="inherit" />
      </OverlayCenter>
    );
  }

  const error =
    (isGetOrganisationsError &&
      tProfile.rich(organisationsError, {
        applicationLink: ApplicationLink,
      })) ||
    (isUpdateError &&
      tProfile.rich(updateError, {
        applicationLink: ApplicationLink,
      })) ||
    (isFileError &&
      tProfile.rich(fileError, {
        applicationLink: ApplicationLink,
      }));

  const formOptions = {
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      orc_id: user?.orc_id,
      organisation_id: user?.organisation_id,
      consent_scrape: user?.consent_scrape,
    },
    error,
  };

  return (
    <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
      <Form onSubmit={handleDetailsSubmit} schema={schema} {...formOptions}>
        {({ formState: { errors }, watch, register }) => (
          <>
            <FormSection heading={tProfile("identity")}>
              <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="organisation_id"
                    error={errors.organisation_id}
                    renderField={() => (
                      <Select
                        defaultValue={watch("organisation_id")}
                        {...register("organisation_id")}
                        inputProps={{
                          "aria-label": tForm("organisationNameAriaLabel"),
                        }}>
                        {organisationsData?.data?.data.map(
                          ({ organisation_name, id }) => (
                            <MenuItem value={id} key={id}>
                              {organisation_name}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="first_name"
                    error={errors.first_name}
                    renderField={fieldProps => (
                      <FormField component={TextField} {...fieldProps} />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="last_name"
                    error={errors.last_name}
                    renderField={fieldProps => (
                      <FormField component={TextField} {...fieldProps} />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="orc_id"
                    error={errors.orc_id}
                    renderField={fieldProps => (
                      <Text
                        endIcon={
                          <Tooltip title={tForm("whatIsTheOrcId")}>
                            <InfoIcon color="info" />
                          </Tooltip>
                        }
                        sx={{ maxWidth: "200px" }}>
                        <FormField component={TextField} {...fieldProps} />
                      </Text>
                    )}
                  />
                </Grid>
                <Grid item>
                  <FormControlHorizontal
                    id="consent_scrape"
                    renderField={() => (
                      <>
                        <FormControlLabel
                          label={tForm("consentScrapeDescription")}
                          control={
                            <Checkbox
                              {...register("consent_scrape")}
                              checked={!!watch("consent_scrape")}
                            />
                          }
                          sx={{
                            mb: 2,
                          }}
                        />
                        <DetailsCV
                          fileName={latestCV?.name || tProfile("noCvUploaded")}
                          isFileSizeTooBig={isFileSizeTooBig}
                          isFileScanning={isScanning}
                          isFileOk={isNotInfected}
                          isFileUploading={isFileLoading}
                          onFileChange={handleFileChange}
                        />
                      </>
                    )}
                    displayLabel={false}
                  />
                </Grid>
              </Grid>
            </FormSection>
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
    </PageGuidance>
  );
}
