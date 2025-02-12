import DateInput from "@/components/DateInput";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormSection from "@/components/FormSection";
import { Message } from "@/components/Message";
import yup from "@/config/yup";
import { FileType } from "@/consts/files";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import useFileUpload from "@/hooks/useFileUpload";
import useUserFileUpload from "@/hooks/useUserFileUpload";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import {
  PageBody,
  PageBodyContainer,
  PageGuidance,
  PageSection,
} from "@/modules";
import ResearcherTrainingEntry from "@/modules/ResearcherTrainingEntry";
import postTrainingsQuery from "@/services/trainings/postTrainingsQuery";
import { PostTrainingsPayload } from "@/services/trainings/types";
import { formatDBDate } from "@/utils/date";
import { showAlert } from "@/utils/showAlert";
import EastIcon from "@mui/icons-material/East";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useMemo } from "react";
import FileUploadDetails from "../FileUploadDetails/FileUploadDetails";
import { StyledBox } from "./Training.styles";

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
  const [user, setUser] = useStore(store => [store.config.user, store.setUser]);

  const histories = useStore(state => state.config.histories);
  const setHistories = useStore(state => state.setHistories);
  const getHistories = useStore(state => state.getHistories);
  const router = useRouter();

  const {
    upload,
    isScanComplete,
    isScanFailed,
    isSizeInvalid,
    isUploading,
    isScanning,
    file,
  } = useFileUpload();

  const uploadFile = useUserFileUpload({
    user,
    fileType: FileType.CERTIFICATION,
    upload,
  });

  const handleFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const updatedUser = await uploadFile(e);

      if (updatedUser) setUser(updatedUser);
    },
    [user?.registry_id]
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
  } = useMutation(postTrainingsQuery(user?.registry_id));

  const handleDetailsSubmit = useCallback(
    async (fields: TrainingFormValues) => {
      if (file?.id) {
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
            certification_id: file?.id,
          });

          onSubmit({
            ...formattedFields,
            expires_in_years: yearsRemaining,
            certification_id: file?.id,
          });

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
      }
    },
    [mutateAsync, onSubmit, tProfile, file?.id]
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
        certification_upload: yup.mixed(),
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
    <PageBodyContainer>
      <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
        <PageBody>
          <PageSection>
            <Form
              onSubmit={handleDetailsSubmit}
              schema={schema}
              {...formOptions}>
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
                      <Grid item xs={12} key="certification_upload">
                        <FormControlHorizontal
                          name="certification_upload"
                          renderField={() => (
                            <FileUploadDetails
                              fileButtonText={tProfile("uploadCertification")}
                              fileType={FileType.CV}
                              fileNameText={
                                file?.name ||
                                tProfile("noCertificationUploaded")
                              }
                              isSizeInvalid={isSizeInvalid}
                              isScanning={isScanning}
                              isScanComplete={isScanComplete}
                              isScanFailed={isScanFailed}
                              isUploading={isUploading}
                              onFileChange={handleFileChange}
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
                <ResearcherTrainingEntry
                  key={training.id}
                  data={training}
                  certification={user?.registry?.files?.filter(
                    a => a.id === training.certification_id
                  )}
                />
              ))}
            </StyledBox>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <LoadingButton
                sx={{ display: "flex" }}
                endIcon={<EastIcon />}
                onClick={() =>
                  router.push(ROUTES.profileResearcherProjects.path)
                }>
                {tProfile("continueLinkText")}
              </LoadingButton>
            </Box>
            {isError && (
              <Message severity="error" sx={{ mb: 3 }}>
                {`${postError}`}
              </Message>
            )}
          </PageSection>
        </PageBody>
      </PageGuidance>
    </PageBodyContainer>
  );
}
