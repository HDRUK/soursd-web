"use client";

import ContactLink from "@/components/ContactLink";
import Guidance from "@/components/Guidance";
import { Message } from "@/components/Message";
import yup from "@/config/yup";
import { MAX_UPLOAD_SIZE_BYTES } from "@/consts/files";
import { useStore } from "@/data/store";
import useFileScanned from "@/hooks/useFileScanned/useFileScanned";
import useQueryRefetch from "@/hooks/useQueryRefetch";
import postFile from "@/services/files/postFile";
import { FilePayload } from "@/services/files/types";
import { PatchUserPayload } from "@/services/users";
import patchUser from "@/services/users/patchUser";
import { EntityType, FileType } from "@/types/api";
import { getLatestCV, isFileScanning } from "@/utils/file";
import { yupResolver } from "@hookform/resolvers/yup";
import { Check, Replay } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DetailsCV from "../DetailsCV";

export interface DetailsFormValues {
  firstName: string;
  lastName: string;
}

export interface DetailsProps {
  emailVerified?: boolean;
}

const NAMESPACE_TRANSLATION_VALIDATION = "Form";
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

  const tValidation = useTranslations(NAMESPACE_TRANSLATION_VALIDATION);
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
      if (user?.id) {
        const { firstName, lastName } = payload;
        const request = {
          ...user,
          first_name: firstName,
          last_name: lastName,
        };

        await mutateUpdateAsync(request);

        setUser(request);
      }
    },
    []
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

  const methods = useForm<DetailsFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user?.first_name,
      lastName: user?.last_name,
    },
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = methods;

  return (
    <Guidance info="Sample guidance">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleDetailsSubmit)}>
          <Grid container rowSpacing={3} md={8}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
    </Guidance>
  );
}
