import ButtonSave from "@/components/ButtonSave";
import ChipStatus, { Status } from "@/components/ChipStatus";
import DateInput from "@/components/DateInput";
import Form from "@/components/Form";
import FormControlWrapper from "@/components/FormControlWrapper";
import FormModalActions from "@/components/FormModalActions";
import FormModalBody from "@/components/FormModalBody";
import yup from "@/config/yup";
import { ResearcherProject } from "@/types/application";
import { QueryState } from "@/types/form";
import CheckIcon from "@mui/icons-material/Check";
import {
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export interface CustodianUserFields {
  first_name: string;
  last_name: string;
  email: string;
  administrator: boolean;
  approver: boolean;
}

export interface UserModalDetailsProps {
  queryState: QueryState;
  project: ResearcherProject;
  onSubmit: (payload: ResearcherProject) => void;
}

const NAMESPACE_TRANSLATION_APPLICATION = "Application";
const NAMESPACE_TRANSLATION_FORM = "Form.SafeProject";

export default function UserModalDetails({
  queryState,
  onSubmit,
  project,
}: UserModalDetailsProps) {
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const schema = useMemo(
    () =>
      yup.object().shape({
        unique_id: yup.string().required(tForm("uniqueIdRequiredInvalid")),
        title: yup.string().required(tForm("titleRequiredInvalid")),
        request_category_type: yup
          .string()
          .required(tForm("requestCategoryTypeRequiredInvalid")),
        start_date: yup.string().required(tForm("startDateRequiredInvalid")),
        end_date: yup.string().required(tForm("endDateRequiredInvalid")),
        lay_summary: yup.string().required(tForm("laySummaryRequiredInvalid")),
        public_benefit: yup
          .string()
          .required(tForm("publicBenefitRequiredInvalid")),
        technical_summary: yup
          .string()
          .required(tForm("technicalSummaryRequiredInvalid")),
        status: yup.string().required(tForm("statusRequiredInvalid")),
      }),
    []
  );

  const formOptions = {
    defaultValues: {
      ...project,
      status: project.model_state?.state.slug || Status.PROJECT_PENDING,
    },
    disabled: queryState.isLoading,
  };

  return (
    <Form
      schema={schema}
      {...formOptions}
      onSubmit={onSubmit}
      autoComplete="off">
      <Grid container rowGap={3}>
        <Grid
          md={8}
          order={{
            md: 1,
            xs: 2,
          }}>
          <FormModalBody>
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <FormControlWrapper
                  name="unique_id"
                  t={tForm}
                  renderField={fieldProps => <TextField {...fieldProps} />}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlWrapper
                  name="title"
                  t={tForm}
                  renderField={fieldProps => <TextField {...fieldProps} />}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlWrapper
                  name="request_category_type"
                  t={tForm}
                  renderField={fieldProps => <TextField {...fieldProps} />}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container columnSpacing={3}>
                  <Grid item xs={6}>
                    <FormControlWrapper
                      name="start_date"
                      renderField={fieldProps => <DateInput {...fieldProps} />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlWrapper
                      name="end_date"
                      renderField={fieldProps => <DateInput {...fieldProps} />}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControlWrapper
                  name="lay_summary"
                  t={tForm}
                  renderField={fieldProps => (
                    <TextField
                      {...fieldProps}
                      multiline
                      style={{ width: "100%" }}
                      minRows={6}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlWrapper
                  name="public_benefit_statement"
                  t={tForm}
                  renderField={fieldProps => (
                    <TextField
                      {...fieldProps}
                      style={{ width: "100%" }}
                      multiline
                      minRows={6}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlWrapper
                  name="technical_summary"
                  t={tForm}
                  renderField={fieldProps => (
                    <TextField
                      {...fieldProps}
                      style={{ width: "100%" }}
                      multiline
                      minRows={6}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlWrapper
                  name="other_approval_committees"
                  t={tForm}
                  renderField={fieldProps => <TextField {...fieldProps} />}
                />
              </Grid>
            </Grid>
          </FormModalBody>
          <FormModalActions>
            <Button variant="outlined" onClick={() => {}}>
              {tApplication("previousButton")}
            </Button>
            <ButtonSave
              type="submit"
              endIcon={<CheckIcon />}
              loading={queryState.isLoading}>
              {tApplication("saveButton")}
            </ButtonSave>
          </FormModalActions>
        </Grid>
        <Grid
          md={4}
          xs={12}
          order={{
            md: 2,
            xs: 1,
          }}>
          <Paper
            elevation={0}
            sx={{ backgroundColor: "neutralGrey.main", p: 3 }}>
            <FormControlWrapper
              fullWidth
              name="status"
              t={tForm}
              renderField={fieldProps => (
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={fieldProps.status}
                  name="status"
                  {...fieldProps}>
                  <FormControlLabel
                    value={Status.PROJECT_APPROVED}
                    control={<Radio />}
                    label={<ChipStatus status={Status.PROJECT_APPROVED} />}
                  />
                  <FormControlLabel
                    value={Status.PROJECT_PENDING}
                    control={<Radio />}
                    label={<ChipStatus status={Status.PROJECT_PENDING} />}
                  />
                  <FormControlLabel
                    value={Status.PROJECT_COMPLETED}
                    control={<Radio />}
                    label={<ChipStatus status={Status.PROJECT_COMPLETED} />}
                  />
                </RadioGroup>
              )}
            />
          </Paper>
        </Grid>
      </Grid>
    </Form>
  );
}
