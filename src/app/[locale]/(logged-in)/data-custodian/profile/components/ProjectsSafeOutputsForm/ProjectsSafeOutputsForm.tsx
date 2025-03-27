import ButtonSave from "@/components/ButtonSave";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import FormFieldArray from "@/components/FormFieldArray";
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

export interface ProjectsSafeOutputsFormProps {
  queryState: QueryState;
  projectDetails: ProjectDetails;
  onSubmit: (payload: PutProjectDetailsPayload) => void;
}

const NAMESPACE_TRANSLATION_APPLICATION = "Application";
const NAMESPACE_TRANSLATION_FORM = "Form.SafeSettings";

export default function ProjectsSafeOutputsForm({
  queryState,
  onSubmit,
  projectDetails,
}: ProjectsSafeOutputsFormProps) {
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const schema = useMemo(
    () =>
      yup.object().shape({
        data_assets: yup.string(),
        research_outputs: yup.array().of(
          yup.object({
            value: yup.string(),
          })
        ),
      }),
    []
  );

  const formOptions = {
    defaultValues: {
      data_assets: projectDetails?.data_assets || "",
      research_outputss: projectDetails?.research_outputs?.split(";") || [],
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
          <FormFieldArray
            name={"research_outputs"}
            createNewRow={() => ({
              url: "",
            })}
            renderField={(field, index) => (
              <FormControlWrapper
                key={field.url}
                label="Receiver URL"
                required
                name={`research_outputs.${index}.url`}
                placeholder={"Link"}
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlWrapper
            name="data_assets"
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
