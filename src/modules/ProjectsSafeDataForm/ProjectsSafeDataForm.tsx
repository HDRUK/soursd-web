import DateInput from "@/components/DateInput";
import Form, { FormProps } from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlCheckbox from "@/components/FormControlCheckbox";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormControl from "@/components/FormControlWrapper";
import FormFieldArray from "@/components/FormFieldArray";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import { RequestFrequency } from "@/consts/projects";
import { useStore } from "@/data/store";
import { ProjectDetails } from "@/types/application";
import { MutationState } from "@/types/form";
import { injectParamsIntoPath } from "@/utils/application";
import {
  FormControlLabel,
  Grid,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import * as yup from "yup";

export interface ProjectsSafeDataFormProps
  extends Omit<FormProps<ProjectDetails>, "children"> {
  projectId?: number;
  mutateState?: MutationState;
  isReadOnly?: boolean;
}

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

export default function ProjectsSafeDataForm({
  projectId,
  mutateState,
  isReadOnly,
  ...restProps
}: ProjectsSafeDataFormProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const routes = useStore(state => state.getApplication().routes);

  const formOptions = {
    disabled: mutateState?.isPending || isReadOnly,
    shouldResetKeep: true,
  };

  const schema = useMemo(
    () =>
      yup.object().shape({
        datasets: yup.array().of(yup.string()),
        data_sensitivity_level: yup.string(),
        legal_basis_for_data_article6: yup
          .string()
          .required(t("lawfulConditionRequired")),
        duty_of_confidentiality: yup.boolean(),
        national_data_optout: yup.boolean(),
        request_frequency: yup.string(),
        dataset_linkage_description: yup.string(),
        data_minimisation: yup.string(),
        data_use_description: yup.string(),
        access_date: yup.string(),
      }),
    [t]
  );

  return (
    <Form schema={schema} {...formOptions} {...restProps}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControlHorizontal
            displayPlaceholder={false}
            label={t("datasetName")}
            labelMd={0}
            contentMd={12}
            name="datasets"
            sx={{ maxWidth: "55%" }}
            renderField={fieldProps => (
              <FormFieldArray<FormData>
                name={fieldProps.name}
                initialRowCount={1}
                minimumRows={1}
                createNewRow={() => ""}
                renderField={(field, index) => (
                  <React.Fragment key={field.name}>
                    <FormControlHorizontal
                      displayLabel={false}
                      labelMd={0}
                      contentMd={12}
                      name={`datasets.${index}`}
                      placeholder={t("datasetsPlaceholder")}
                      renderField={fieldProps => (
                        <TextField {...fieldProps} fullWidth />
                      )}
                    />
                  </React.Fragment>
                )}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            name="data_sensitivity_level"
            label={t("dataSensitivityLevel")}
            sx={{ maxWidth: "33%" }}
            renderField={props => (
              <Select {...props} fullWidth>
                <MenuItem value="De-Personalised">
                  {t("dePersonalised")}
                </MenuItem>
                <MenuItem value="Personally Identifiable">
                  {t("personallyIdentifiable")}
                </MenuItem>
                <MenuItem value="Anonymous">{t("anonymous")}</MenuItem>
              </Select>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            name="legal_basis_for_data_article6"
            label={t.rich("lawfulCondition", {
              link: chunks => (
                <Link href="https://gdpr-info.eu/art-6-gdpr/" target="_blank">
                  {chunks}
                </Link>
              ),
            })}
            sx={{ maxWidth: "50%" }}
            renderField={props => <TextField {...props} fullWidth />}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlCheckbox
            name="duty_of_confidentiality"
            label={t.rich("lawfulBasisConfirmation", {
              link: chunks => (
                <Link
                  href="https://www.gov.uk/government/publications/accessing-ukhsa-protected-data/approval-standards-and-guidelines-confidential-patient-information"
                  target="_blank">
                  {chunks}
                </Link>
              ),
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlCheckbox
            name="national_data_optout"
            label={t("nationalDataOptOut")}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            name="request_frequency"
            label={t("requestFrequency")}
            placeholder=""
            renderField={props => (
              <RadioGroup {...props} row>
                <FormControlLabel
                  value={RequestFrequency.ONE_OFF}
                  control={<Radio />}
                  label={t("oneOffRequest")}
                />
                <FormControlLabel
                  value={RequestFrequency.RECURRING}
                  control={<Radio />}
                  label={t("recurringDataset")}
                />
              </RadioGroup>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            name="dataset_linkage_description"
            label={t("linkedDatasets")}
            sx={{ maxWidth: "50%" }}
            renderField={props => (
              <TextField {...props} fullWidth multiline rows={4} />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            name="data_minimisation"
            label={t("dataMinimisation")}
            sx={{ maxWidth: "50%" }}
            renderField={props => (
              <TextField {...props} fullWidth multiline rows={4} />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            name="data_use_description"
            label={t("dataDescription")}
            sx={{ maxWidth: "50%" }}
            renderField={props => (
              <TextField {...props} fullWidth multiline rows={4} />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            name="access_date"
            label={t("releaseDate")}
            description={t("releaseDateDescription")}
            placeholder=""
            sx={{ maxWidth: "40%" }}
            renderField={props => <DateInput {...props} />}
          />
        </Grid>
      </Grid>
      {!isReadOnly && projectId && (
        <FormActions>
          <ProfileNavigationFooter
            previousHref={injectParamsIntoPath(
              routes.profileCustodianProjectsSafeProject.path,
              {
                id: projectId,
              }
            )}
            isLoading={mutateState?.isPending}
          />
        </FormActions>
      )}
    </Form>
  );
}
