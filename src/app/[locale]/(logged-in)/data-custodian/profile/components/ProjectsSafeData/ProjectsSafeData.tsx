import DateInput from "@/components/DateInput";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlCheckbox from "@/components/FormControlCheckbox";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormControl from "@/components/FormControlWrapper";
import FormFieldArray from "@/components/FormFieldArray";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import { RequestFrequency } from "@/consts/projects";
import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageBody } from "@/modules";
import PageGuidance from "@/modules/PageGuidance";
import useMutateProjectDetails from "@/queries/useMutateProjectDetails";
import { PutProjectDetailsPayload } from "@/services/project_details";
import { ProjectDetails } from "@/types/application";
import { injectParamsIntoPath } from "@/utils/application";
import { createProjectDetailDefaultValues } from "@/utils/form";
import { pick } from "@/utils/json";
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
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";
import * as yup from "yup";
import ProjectImport from "../ProjectImport";

interface ProjectsSafeDataProps {
  id: number;
}

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

const PAYLOAD_FIELDS = [
  "datasets",
  "data_sensitivity_level",
  "legal_basis_for_data_article6",
  "duty_of_confidentiality",
  "national_data_optout",
  "request_frequency",
  "dataset_linkage_description",
  "data_minimisation",
  "data_use_description",
  "access_date",
];

export default function ProjectsSafeData({ id }: ProjectsSafeDataProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const { custodian, project, routes } = useStore(state => ({
    custodian: state.getCustodian(),
    project: state.getProject(),
    routes: state.getApplication().routes,
  }));

  const queryClient = useQueryClient();

  const { mutateAsync, mutateState } = useMutateProjectDetails(project.id);

  const [defaultValues, setDefaultValues] = useState(
    pick(
      createProjectDetailDefaultValues(project.project_detail || {}),
      PAYLOAD_FIELDS
    )
  );

  useQueryAlerts(mutateState);

  const handleGatewayProjectImport = (data: ProjectDetails) => {
    setDefaultValues(pick(data, PAYLOAD_FIELDS));
  };

  const formOptions = {
    defaultValues,
    disabled: mutateState.isPending,
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

  const handleSubmit = async (payload: PutProjectDetailsPayload) => {
    await mutateAsync({
      ...project.project_detail,
      ...payload,
    });

    queryClient.refetchQueries({
      queryKey: ["getProject", project.id],
    });
  };

  return (
    <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
      <PageBody
        heading={t("safeData")}
        actions={
          <ProjectImport
            custodianId={custodian.id}
            projectId={project.id}
            onImported={handleGatewayProjectImport}
            isImportDisabled={!project?.unique_id}
          />
        }>
        <Form onSubmit={handleSubmit} schema={schema} {...formOptions}>
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
                    <Link
                      href="https://gdpr-info.eu/art-6-gdpr/"
                      target="_blank">
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
          <FormActions>
            <ProfileNavigationFooter
              previousHref={injectParamsIntoPath(
                routes.profileCustodianProjectsSafeProject.path,
                {
                  id,
                }
              )}
              isLoading={mutateState.isPending}
            />
          </FormActions>
        </Form>
      </PageBody>
    </PageGuidance>
  );
}
