import ButtonSave from "@/components/ButtonSave";
import { Status } from "@/components/ChipStatus";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import yup from "@/config/yup";
import { ProjectDetailsAccessType } from "@/consts/projects";
import { PutProjectDetailsPayload } from "@/services/projects";
import { ProjectDetails } from "@/types/application";
import { QueryState } from "@/types/form";
import CheckIcon from "@mui/icons-material/Check";
import {
  Button,
  FormControlLabel,
  Grid,
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

export interface ProjectSafeProjectFormProps {
  queryState: QueryState;
  projectDetails: ProjectDetails;
  onSubmit: (payload: PutProjectDetailsPayload) => void;
}

const NAMESPACE_TRANSLATION_APPLICATION = "Application";
const NAMESPACE_TRANSLATION_FORM = "Form.SafeSettings";

export default function ProjectSafeSettingsForm({
  queryState,
  onSubmit,
  projectDetails,
}: ProjectSafeProjectFormProps) {
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const schema = useMemo(
    () =>
      yup.object().shape({
        access_type: yup.string(),
        data_privacy: yup.string(),
      }),
    []
  );

  const formOptions = {
    defaultValues: {
      access_type: projectDetails?.access_type || "",
      data_privacy: projectDetails?.data_privacy || "",
    },
    disabled: queryState.isLoading,
  };

  return (
    <Form
      schema={schema}
      {...formOptions}
      onSubmit={onSubmit}
      autoComplete="off">
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <FormControlWrapper
            fullWidth
            name="access_type"
            t={tForm}
            renderField={fieldProps => (
              <RadioGroup
                value={fieldProps.access_type}
                name="access_type"
                {...fieldProps}>
                <FormControlLabel
                  value={ProjectDetailsAccessType.TRE}
                  control={<Radio />}
                  label={tForm("accessTypeSde")}
                />
                <FormControlLabel
                  value={ProjectDetailsAccessType.RELEASE}
                  control={<Radio />}
                  label={tForm("accessTypeDataRelease")}
                />
              </RadioGroup>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlWrapper
            name="data_privacy"
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
      </Grid>
      <FormActions>
        <Button variant="outlined" onClick={() => {}}>
          {tApplication("previousButton")}
        </Button>
        <ButtonSave
          type="submit"
          endIcon={<CheckIcon />}
          loading={queryState.isLoading}>
          {tApplication("saveButton")}
        </ButtonSave>
      </FormActions>
    </Form>
  );
}
