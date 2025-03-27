import ButtonSave from "@/components/ButtonSave";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlWrapper from "@/components/FormControlWrapper";
import FormFieldArray from "@/components/FormFieldArray";
import yup from "@/config/yup";
import { ProjectDetails } from "@/types/application";
import { QueryState } from "@/types/form";
import { toFieldArrayData } from "@/utils/form";
import CheckIcon from "@mui/icons-material/Check";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export interface CustodianUserFields {
  first_name: string;
  last_name: string;
  email: string;
  administrator: boolean;
  approver: boolean;
}

export interface ProjectsSafeOutputsFormFieldValues {
  data_assets: string;
  research_outputs: { value: string }[];
}

export interface ProjectsSafeOutputsFormProps {
  queryState: QueryState;
  projectDetails: ProjectDetails;
  onSubmit: (fields: ProjectsSafeOutputsFormFieldValues) => void;
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
      research_outputs: toFieldArrayData(projectDetails?.research_outputs),
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
          <Typography mb={1}>Links to research outputs</Typography>
          <FormFieldArray
            name="research_outputs"
            addButtonLabel={tApplication("addLink")}
            createNewRow={() => ({
              url: "",
            })}
            renderField={(_, index) => (
              <FormControlWrapper
                displayLabel={false}
                name={`research_outputs.${index}.value`}
                placeholder={tApplication("link")}
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
