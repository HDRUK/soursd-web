"use client";

import ContactLink from "@/components/ContactLink";
import Mask from "@/components/Mask";
import { MAX_UPLOAD_SIZE_BYTES } from "@/consts/files";
import useFileScanned from "@/hooks/useFileScanned/useFileScanned";
import useQueryRefetch from "@/hooks/useQueryRefetch";
import { User } from "@/services/auth";
import postFile from "@/services/files/postFile";
import { FilePayload } from "@/services/files/types";
import { EntityType, FileType } from "@/types/api";
import { FormMutateState } from "@/types/form";
import { getLatestCV, isFileScanning } from "@/utils/file";
import { yupResolver } from "@hookform/resolvers/yup";
import { Check, Replay } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from "yup";
import CVDetails from "../CVDetails";

export interface PersonalDetailsFormValues {
  firstName: string;
  lastName: string;
}

export interface PersonalDetailsProps {
  emailVerified?: boolean;
  user: User;
  mutateState: FormMutateState;
  onSubmit: (data: PersonalDetailsFormValues) => void;
}

const NAMESPACE_TRANSLATION_VALIDATION = "Form";
const NAMESPACE_TRANSLATION_PERSONAL_DETAILS = "PersonalDetails";

export default function PersonalDetails({
  user,
  mutateState,
  emailVerified,
  onSubmit,
}: PersonalDetailsProps) {
  const tValidation = useTranslations(NAMESPACE_TRANSLATION_VALIDATION);
  const tPersonalDetails = useTranslations(
    NAMESPACE_TRANSLATION_PERSONAL_DETAILS
  );
  const [isFileSizeTooBig, setIsFileSizeTooBig] = useState(false);
  const theme = useTheme();

  const latestCV = getLatestCV(user.registry.files);

  const { isNotInfected, isScanning } = useFileScanned(latestCV);

  const { refetch: refetchUser, cancel: refetchCancel } = useQueryRefetch({
    options: { queryKey: ["getUser", user.id] },
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
    isLoading: isFileLoading,
    error: fileError,
  } = useMutation(["postFile"], async (payload: () => FilePayload) => {
    return postFile(payload, {
      error: { message: "cvUploadFailed" },
    });
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

  const methods = useForm<PersonalDetailsFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user.first_name,
      lastName: user.last_name,
    },
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = methods;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 5,
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          gap: 2,
        },
      }}>
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Mask width="160px" height="160px">
          PH
        </Mask>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography fontWeight="bold">
            {user.last_name}, {user.first_name}
          </Typography>
          <Typography>{user.email}</Typography>
        </Box>
      </Box>
      <Divider
        orientation="vertical"
        sx={{
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        }}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={3} md={8}>
            <Grid item xs={12}>
              {mutateState.isError && (
                <Alert color="error" sx={{ mb: 3 }}>
                  {tPersonalDetails.rich(mutateState.error, {
                    contactLink: ContactLink,
                  })}
                </Alert>
              )}
              {isFileError && (
                <Alert color="error" sx={{ mb: 3 }}>
                  {tPersonalDetails.rich(fileError, {
                    contactLink: ContactLink,
                  })}
                </Alert>
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
              <CVDetails
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
            loading={mutateState.isLoading}
            sx={{ mt: 5 }}>
            {tPersonalDetails("submitButton")}
          </LoadingButton>
        </form>
      </FormProvider>
    </Box>
  );
}
