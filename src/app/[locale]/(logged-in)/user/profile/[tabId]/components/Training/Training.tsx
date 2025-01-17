import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormField from "@/components/FormField";
import FormSection from "@/components/FormSection";
import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import ResearcherTrainingEntry from "@/modules/ResearcherTrainingEntry";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import useUserProfileCompletion from "@/hooks/useUserProfileCompletion";
import useQueryRefetch from "@/hooks/useQueryRefetch";
import { useCallback, useMemo } from "react";
import { UserProfileCompletionCategories } from "@/consts/user";
import ApplicationLink from "@/components/ApplicationLink";
import yup from "@/config/yup";
import dayjs from "dayjs";
import SaveIcon from "@mui/icons-material/Save";
import DateInput from "@/components/DateInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostTrainingsPayload } from "@/services/trainings/types";
import { Message } from "@/components/Message";
import { showAlert } from "@/utils/showAlert";
import { getTrainingByRegistryId, postTrainings } from "@/services/trainings";
import { formatDBDate } from "@/utils/date";
import { StyledBox } from "./Training.styles";

export interface TrainingFormValues {
  provider: string;
  training_name: string;
  awarded_at: string;
  expires_at: string;
}

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_HISTORIES = "ResearcherHistories";

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
  const tHistories = useTranslations(NAMESPACE_TRANSLATION_HISTORIES);

  const user = useStore(state => state.config.user);

  const { update: updateCompletion, isLoading: isUpdateLoading } =
    useUserProfileCompletion();
  const {
    isError: isGetTrainingError,
    isLoading: isGetTrainingLoading,
    data: trainingsData,
  } = useQuery({
    queryKey: ["getTrainingByRegistryId", user?.id],
    queryFn: () =>
      getTrainingByRegistryId(1, {
        error: { message: tProfile("noTrainingsError") },
      }),
  });

  const { refetch: refetchTrainings } = useQueryRefetch({
    options: { queryKey: ["getTrainingByRegistryId", user?.id] },
  });

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
        });

        const request = {
          ...user,
          ...formattedFields,
        };

        await updateCompletion(
          formattedFields,
          UserProfileCompletionCategories.TRAINING,
          request
        );

        refetchTrainings();

        showAlert("success", {
          text: tProfile("postTrainingSuccess"),
          confirmButtonText: tProfile("postTrainingSuccessButton"),
        });
      } catch (_) {
        const errorMessage = tProfile(postError);
        showAlert("error", {
          text: errorMessage,
          confirmButtonText: tProfile("postTrainingErrorButton"),
        });
      }
    },
    [user, mutateAsync, updateCompletion, refetchTrainings, tForm]
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
      }),
    [tForm]
  );

  const error =
    isGetTrainingError &&
    tProfile.rich(tHistories("noTrainingsFound"), {
      applicationLink: ApplicationLink,
    });

  const formOptions = {
    defaultValues: {
      provider: "",
      training_name: "",
      awarded_at: "",
      expires_at: "",
    },
    error,
  };

  return (
    <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
      <Form onSubmit={handleDetailsSubmit} schema={schema} {...formOptions}>
        {({ formState: { errors } }) => (
          <>
            <FormSection heading={tProfile("training")}>
              <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="provider"
                    error={errors.provider}
                    renderField={fieldProps => (
                      <FormField component={TextField} {...fieldProps} />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="training_name"
                    error={errors.training_name}
                    renderField={fieldProps => (
                      <FormField component={TextField} {...fieldProps} />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="awarded_at"
                    error={errors.awarded_at}
                    renderField={fieldProps => (
                      <FormField component={DateInput} {...fieldProps} />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    id="expires_at"
                    error={errors.expires_at}
                    renderField={fieldProps => (
                      <FormField component={DateInput} {...fieldProps} />
                    )}
                  />
                </Grid>
              </Grid>
            </FormSection>
            <FormActions>
              <LoadingButton
                type="submit"
                endIcon={<SaveIcon />}
                loading={isUpdateLoading || isPending}
                sx={{ display: "flex", justifySelf: "end" }}>
                {tProfile("submitButton")}
              </LoadingButton>
            </FormActions>
          </>
        )}
      </Form>
      {!isGetTrainingLoading && (
        <StyledBox>
          {trainingsData?.data.map(training => (
            <ResearcherTrainingEntry data={training} />
          ))}
        </StyledBox>
      )}
      {isError && (
        <Message severity="error" sx={{ mb: 3 }}>
          {`${error}`}
        </Message>
      )}
    </PageGuidance>
  );
}
