import Form from "@/components/Form";
import FormActions from "@/components/FormActions";

import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormSection from "@/components/FormSection";
import SelectInput from "@/components/SelectInput";
import yup from "@/config/yup";
import { AffiliationRelationship } from "@/consts/user";
import getOrganisationsQuery from "@/services/organisations/getOrganisationsQuery";
import { ResearcherAffiliation } from "@/types/application";
import { MutationState } from "@/types/form";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Button, Checkbox, Grid, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export interface AffiliationsFormProps {
  onSubmit: (affiliation: ResearcherAffiliation) => void;
  queryState: MutationState;
}

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function AffiliationsForm({
  onSubmit,
  queryState,
}: AffiliationsFormProps) {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

  const { data: organisationsData } = useQuery(getOrganisationsQuery());

  const schema = useMemo(
    () =>
      yup.object().shape({
        member_id: yup.string().required(tForm("memberIdRequiredInvalid")),
        organisation_id: yup
          .string()
          .required(tForm("organisationRequiredInvalid")),
        relationship: yup
          .string()
          .required(tForm("relationshipRequiredInvalid")),
        current_employer: yup.boolean(),
      }),
    [tForm]
  );

  const formOptions = {
    defaultValues: {
      member_id: "",
      organisation_id: "",
      current_employer: false,
      relationship: "",
    },
  };

  const relationshipOptions = [
    {
      label: tApplication("employee"),
      value: AffiliationRelationship.EMPLOYEE,
    },
    {
      label: tApplication("honoraryContract"),
      value: AffiliationRelationship.HONORARY_CONTRACT,
    },
    {
      label: tApplication("student"),
      value: AffiliationRelationship.STUDENT,
    },
  ];

  return (
    <Form onSubmit={onSubmit} schema={schema} {...formOptions} sx={{ mb: 3 }}>
      {() => (
        <>
          <FormSection heading={tApplication("affiliations")}>
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <FormControlHorizontal
                  name="organisation_id"
                  renderField={fieldProps => (
                    <SelectInput
                      {...fieldProps}
                      options={(organisationsData?.data?.data || []).map(
                        ({ organisation_name, id }) => ({
                          label: organisation_name,
                          value: id,
                        })
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "inline-flex", gap: 2, alignItems: "center" }}>
                <span>{tProfile("organisationNotListed")}</span>
                <Button>{tProfile("organisationRegister")}</Button>
              </Grid>
              <Grid item xs={12}>
                <FormControlHorizontal
                  name="current_employer"
                  renderField={fieldProps => <Checkbox {...fieldProps} />}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlHorizontal
                  name="relationship"
                  renderField={fieldProps => (
                    <SelectInput
                      {...fieldProps}
                      options={relationshipOptions}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlHorizontal
                  name="member_id"
                  renderField={fieldProps => <TextField {...fieldProps} />}
                />
              </Grid>
            </Grid>
          </FormSection>
          <FormActions>
            <LoadingButton
              type="submit"
              endIcon={<SaveIcon />}
              loading={queryState.isPending}
              sx={{ display: "flex", justifySelf: "end" }}>
              {tProfile(`submitButton`)}
            </LoadingButton>
          </FormActions>
        </>
      )}
    </Form>
  );
}
