import Form from "@/components/Form";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormModalActions from "@/components/FormModalActions";
import FormModalBody from "@/components/FormModalBody";
import FormModalHeader from "@/components/FormModalHeader";
import FormControlCheckbox from "@/components/FormControlCheckbox";
import yup from "@/config/yup";
import { CustodianUserRoles } from "@/consts/custodian";
import { useStore } from "@/data/store";
import { CustodianUser, Project } from "@/types/application";
import { QueryState } from "@/types/form";
import {
  isCustodianAdministrator,
  isCustodianApprover,
} from "@/utils/custodian";
import CheckIcon from "@mui/icons-material/Check";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { ChangeEvent, useMemo } from "react";
import FormControlWrapper from "@/components/FormControlWrapper";
import DateInput from "@/components/DateInput";
import ChipStatus, { Status } from "@/components/ChipStatus";
import ButtonSave from "@/components/ButtonSave";

export interface CustodianUserFields {
  first_name: string;
  last_name: string;
  email: string;
  administrator: boolean;
  approver: boolean;
}

export interface UserModalDetailsProps {
  queryState: QueryState;
  onSubmit: (payload: CustodianUserFields) => void;
  onClose: () => void;
}

const NAMESPACE_TRANSLATION_APPLICATION = "Application";
const NAMESPACE_TRANSLATION_FORM = "Form.SafeProject";

export default function UserModalDetails({
  onClose,
  queryState,
  onSubmit,
}: UserModalDetailsProps) {
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const project = useStore(state => state.getProject());

  const schema = useMemo(
    () =>
      yup.object().shape({
        unique_id: yup.string().required(tForm("uniqueIdRequiredInvalid")),
        title: yup.string().required(tForm("titleRequiredInvalid")),
        request_category_type: yup
          .string()
          .required(tForm("titleRequiredInvalid")),
        start_date: yup.string().required(tForm("titleRequiredInvalid")),
        end_date: yup.string().required(tForm("titleRequiredInvalid")),
        lay_summary: yup.string().required(tForm("titleRequiredInvalid")),
        public_benefit: yup.string().required(tForm("titleRequiredInvalid")),
        technical_summary: yup.string().required(tForm("titleRequiredInvalid")),
        status: yup.string().required(tForm("statusRequiredInvalid")),
      }),
    []
  );

  const formOptions = {
    defaultValues: project,
    disabled: queryState.isLoading,
  };

  return (
    <Form
      schema={schema}
      {...formOptions}
      onSubmit={onSubmit}
      shouldReset
      autoComplete="off">
      <Grid container>
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
            <Button variant="outlined" onClick={onClose}>
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
                  defaultValue={fieldProps.status}
                  name="status">
                  <FormControlLabel
                    value="approved"
                    control={<Radio />}
                    label={<ChipStatus status={Status.APPROVED}></ChipStatus>}
                  />
                  <FormControlLabel
                    value="pending"
                    control={<Radio />}
                    label={<ChipStatus status={Status.PENDING}></ChipStatus>}
                  />
                  <FormControlLabel
                    value="completed"
                    control={<Radio />}
                    label={<ChipStatus status={Status.COMPLETED}></ChipStatus>}
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
