import DateInput from "@/components/DateInput";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormSection from "@/components/FormSection";
import ProfileNavigationFooter from "@/components/ProfileNavigationFooter";
import SelectInput from "@/components/SelectInput";
import yup from "@/config/yup";
import { ROUTES } from "@/consts/router";
import { AffiliationRelationship } from "@/consts/user";
import useOrganisationsQuery from "@/services/organisations/useOrganisationsQuery";
import { ResearcherAffiliation } from "@/types/application";
import { MutationState } from "@/types/form";
import { Checkbox, Grid, MenuItem, Select, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import AskOrganisationModal from "../AskOrganisation";

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
  const [inviteOpen, setInviteOpen] = useState(false);

  const { data: organisationsData } = useOrganisationsQuery();

  const schema = useMemo(
    () =>
      yup.object().shape({
        member_id: yup.string().required(tForm("memberIdRequiredInvalid")),
        start_date: yup.date().nullable(),
        end_date: yup.date().nullable(),
        organisation_id: yup
          .string()
          .required(tForm("organisationRequiredInvalid")),
        relationship: yup
          .string()
          .required(tForm("relationshipRequiredInvalid")),
        current_employer: yup.boolean(),
        position: yup.string().required(tForm("positionRequiredInvalid")),
      }),
    [tForm]
  );

  const formOptions = {
    defaultValues: {
      member_id: "",
      organisation_id: "",
      current_employer: false,
      relationship: "",
      start_date: null,
      end_date: null,
      position: "",
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
    { label: tApplication("student"), value: AffiliationRelationship.STUDENT },
  ];

  return (
    <>
      <Form
        onSubmit={onSubmit}
        schema={schema}
        {...formOptions}
        sx={{ mb: 3 }}
        shouldReset>
        {({ watch }) => {
          const isCurrent = watch("current_employer");
          return (
            <>
              <FormSection heading={tProfile("affiliationsForm")}>
                <Grid container rowSpacing={3}>
                  <Grid item xs={12}>
                    <FormControlHorizontal
                      name="organisation_id"
                      renderField={fieldProps => (
                        <Select {...fieldProps}>
                          {(organisationsData?.data?.data ?? []).map(
                            (org: {
                              organisation_name: string;
                              id: string;
                            }) => (
                              <MenuItem
                                value={org.id}
                                key={org.id}
                                id={org.organisation_name}>
                                {org.organisation_name}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlHorizontal
                      name="start_date"
                      renderField={fieldProps => <DateInput {...fieldProps} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlHorizontal
                      name="current_employer"
                      renderField={fieldProps => <Checkbox {...fieldProps} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlHorizontal
                      name="end_date"
                      disabled={isCurrent}
                      renderField={fieldProps => (
                        <DateInput {...fieldProps} disabled={isCurrent} />
                      )}
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
                      name="position"
                      renderField={fieldProps => <TextField {...fieldProps} />}
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
                <ProfileNavigationFooter
                  previousHref={ROUTES.profileResearcherIdentity.path}
                  nextStepText={tProfile("experience")}
                  isLoading={queryState.isPending}
                />
              </FormActions>
            </>
          );
        }}
      </Form>
      <AskOrganisationModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
      />
    </>
  );
}
