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
import { useCallback, useMemo } from "react";
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

export interface TrainingFormValues {
  provider: string;
  training_name: string;
  awarded_at: string;
  expires_at: string;
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
    mutationKey: ["postTrainings", 1],
    mutationFn: (payload: PostTrainingsPayload) => {
      return postTrainings(1, payload, {
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

        onSubmit({ ...formattedFields, expires_in_years: yearsRemaining });

        showAlert("success", {
          text: tProfile("postTrainingSuccess"),
          confirmButtonText: tProfile("postTrainingSuccessButton"),
        });
      } catch (error) {
        console.log(error);
        const errorMessage = tProfile("postTrainingError");
        showAlert("error", {
          text: errorMessage,
          confirmButtonText: tProfile("postTrainingErrorButton"),
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

  return (
    <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
      <Form onSubmit={handleDetailsSubmit} schema={schema} {...formOptions}>
        {() => (
          <>
            <FormSection heading={tProfile("training")}>
              <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    name="provider"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    name="training_name"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    name="awarded_at"
                    renderField={fieldProps => <DateInput {...fieldProps} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlHorizontal
                    name="expires_at"
                    renderField={fieldProps => <DateInput {...fieldProps} />}
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
          <ResearcherTrainingEntry data={training} />
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
