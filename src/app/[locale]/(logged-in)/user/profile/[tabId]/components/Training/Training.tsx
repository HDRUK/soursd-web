import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormSection from "@/components/FormSection";
import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import ResearcherTrainingEntry from "@/modules/ResearcherTrainingEntry";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import yup from "@/config/yup";
import dayjs from "dayjs";
import SaveIcon from "@mui/icons-material/Save";
import DateInput from "@/components/DateInput";
import { useMutation } from "@tanstack/react-query";
import { PostTrainingsPayload } from "@/services/trainings/types";
import { Message } from "@/components/Message";
import { showAlert } from "@/utils/showAlert";
import { postTrainings } from "@/services/trainings";
import { formatDBDate } from "@/utils/date";
import { StyledBox } from "./Training.styles";
import FileUploadDetails from "../FileUploadDetails/FileUploadDetails";
import useFileScanned from "@/hooks/useFileScanned";
import { getUploadedCertification, isFileScanning } from "@/utils/file";
import useQueryRefetch from "@/hooks/useQueryRefetch";
import { FilePayload, postFile } from "@/services/files";
import { FileType, MAX_UPLOAD_SIZE_BYTES } from "@/consts/files";
import { EntityType } from "@/types/api";

export interface TrainingFormValues {
  provider: string;
  training_name: string;
  awarded_at: string;
  expires_at: string;
  certification_upload: File;
}

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_FORM = "Form";

const calculateYearsRemaining = (expirationDate: string): number => {
  const now = dayjs();
  const expiration = dayjs(expirationDate);
  if (!expiration.isValid() || expiration.isBefore(now)) {
    return 0;
  }
  return expiration.diff(now, "year", true);
};

export default function Training() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const user = useStore(state => state.config.user);
  const histories = useStore(state => state.config.histories);
  const setHistories = useStore(state => state.setHistories);
  const getHistories = useStore(state => state.getHistories);

  const [isFileSizeTooBig, setIsFileSizeTooBig] = useState(false);

  const uploadedCertification = getUploadedCertification(user?.registry?.files || []);

  const { isNotInfected, isScanning } = useFileScanned(uploadedCertification);
  
  const { refetch: refetchUser, cancel: refetchCancel } = useQueryRefetch({
    options: { queryKey: ["getUser", user?.id] },
  });
  
  useEffect(() => {
    if (isFileScanning(uploadedCertification)) {
      refetchUser();
    } else {
      refetchCancel();
    }

    return () => refetchCancel();
  }, [JSON.stringify(uploadedCertification)]);
  
  const {
    mutateAsync: mutateFileAsync,
    isError: isFileError,
    isPending: isFileLoading,
    error: fileError,
  } = useMutation({
    mutationKey: ["postFile"],
    mutationFn: (payload: () => FilePayload) => {
      return postFile(payload, {
        error: { message: "certificationUploadFailed" },
      });
    },
  });
  
  const handleFileChange = useCallback(
    async ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
      setIsFileSizeTooBig(false);

      if (files?.[0]) {
        if (files[0].size <= MAX_UPLOAD_SIZE_BYTES) {
          await mutateFileAsync(() => {
            const file = new FormData();

            file.append("file", files[0]);
            file.append("file_type", FileType.CERTIFICATION);
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
  
  const onSubmit = useCallback(
    async (training: PostTrainingsPayload) => {
      try {
        const histories = getHistories();
        const updatedHistories = {
          ...histories,
          training: [...histories.training, training],
        };
        if (updatedHistories) {
          setHistories(updatedHistories);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [getHistories, setHistories]
  );

  const {
    mutateAsync,
    isPending,
    isError,
    error: postError,
  } = useMutation({
    mutationKey: ["postTrainings", user?.id],
    mutationFn: (payload: PostTrainingsPayload) => {
      return postTrainings(user?.id, payload, {
        error: { message: "postTrainingError" },
      });
    },
  });

  const handleDetailsSubmit = useCallback(
    async (fields: TrainingFormValues) => {
      try {
        const yearsRemaining = calculateYearsRemaining(fields.expires_at);
        const formattedFields = {
          ...fields,
          awarded_at: formatDBDate(fields.awarded_at),
          expires_at: formatDBDate(fields.awarded_at),
        };

        await mutateAsync({
          ...formattedFields,
          expires_in_years: yearsRemaining,
          certification_uploaded: !!uploadedCertification
        });

        onSubmit({ ...formattedFields, expires_in_years: yearsRemaining });

        showAlert("success", {
          text: tProfile("postTrainingSuccess"),
          confirmButtonText: tProfile("closeButton"),
        });
      } catch (_) {
        const errorMessage = tProfile("postTrainingError");
        showAlert("error", {
          text: errorMessage,
          confirmButtonText: tProfile("errorButton"),
        });
      }
    },
    [mutateAsync, onSubmit, tProfile]
  );

  const schema = useMemo(
    () =>
      yup.object().shape({
        provider: yup
          .string()
          .required(tForm("trainingProviderRequiredInvalid")),
        training_name: yup
          .string()
          .required(tForm("trainingNameRequiredInvalid")),
        awarded_at: yup
          .string()
          .required(tForm("awardedAtRequiredInvalid"))
          .test("not-future", tForm("awardedAtFutureInvalid"), value => {
            return (
              dayjs(value).isBefore(dayjs()) ||
              dayjs(value).isSame(dayjs(), "day")
            );
          }),
        expires_at: yup
          .string()
          .required(tForm("expiresAtRequiredInvalid"))
          .test(
            "after-awarded",
            tForm("expiresAtBeforeAwardedAtInvalid"),
            (value, context) => {
              const { awarded_at } = context.parent;
              return dayjs(value).isAfter(dayjs(awarded_at));
            }
          )
          .test("is-future", tForm("expiresAtPastInvalid"), value => {
            return dayjs(value).isAfter(dayjs());
          }),
        certification_upload: yup.mixed().required(tForm("certificationRequiredInvalid")),
  
      }),
    [tForm]
  );

  const formOptions = {
    defaultValues: {
      provider: "",
      training_name: "",
      awarded_at: "",
      expires_at: "",
    },
  };

  const formFields = [
    { name: "provider", component: TextField },
    { name: "training_name", component: TextField },
    { name: "awarded_at", component: DateInput },
    { name: "expires_at", component: DateInput },
  ];

  return (
    <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
      <Form onSubmit={handleDetailsSubmit} schema={schema} {...formOptions}>
        {() => (
          <>
            <FormSection heading={tProfile("training")}>
              <Grid container rowSpacing={3}>
                {formFields.map(field => (
                  <Grid item xs={12} key={field.name}>
                    <FormControlHorizontal
                      name={field.name}
                      renderField={fieldProps => (
                        <field.component {...fieldProps} />
                      )}
                    />
                  </Grid>
                ))}
                <Grid item xs={12} key={'certification_upload'}>
                    <FormControlHorizontal
                      name={'certification_upload'}
                      renderField={fieldProps => (
                        <FileUploadDetails 
                        fileType='certification'
                        fileName={uploadedCertification?.name || tProfile("noCertificationUploaded")}
                        isFileSizeTooBig={isFileSizeTooBig}
                        isFileScanning={isScanning}
                        isFileOk={isNotInfected}
                        isFileUploading={isFileLoading}
                        onFileChange={handleFileChange}
                        {...fieldProps}
                        />
                      )}
                    />
                  </Grid>
              </Grid>
            </FormSection>
            <FormActions>
              <LoadingButton
                type="submit"
                endIcon={<SaveIcon />}
                loading={isPending}
                sx={{ display: "flex", justifySelf: "end" }}>
                {tProfile("submitButton")}
              </LoadingButton>
            </FormActions>
          </>
        )}
      </Form>
      <StyledBox>
        {histories?.training?.map(training => (
          <ResearcherTrainingEntry key={training.id} data={training} />
        ))}
      </StyledBox>
      {isError && (
        <Message severity="error" sx={{ mb: 3 }}>
          {`${postError}`}
        </Message>
      )}
    </PageGuidance>
  );
}
