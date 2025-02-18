import Form from "@/components/Form";
import FormActions from "@/components/FormActions";

import ButtonSave from "@/components/ButtonSave";
import FormControlHorizontal from "@/components/FormControlHorizontal";
import FormSection from "@/components/FormSection";
import SelectInput from "@/components/SelectInput";
import yup from "@/config/yup";
import { AffiliationRelationship } from "@/consts/user";
import useOrganisationsQuery from "@/services/organisations/useOrganisationsQuery";
import { ResearcherAffiliation } from "@/types/application";
import { MutationState } from "@/types/form";
import { Button, Checkbox, Grid, TextField } from "@mui/material";
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
    <>
      <Form onSubmit={onSubmit} schema={schema} {...formOptions} sx={{ mb: 3 }}>
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
              <Button onClick={() => setInviteOpen(true)}>
                {tProfile("organisationRegister")}
              </Button>
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
                  <SelectInput {...fieldProps} options={relationshipOptions} />
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
          <ButtonSave isLoading={queryState.isPending} />
        </FormActions>
      </Form>
      <AskOrganisationModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
      />
    </>
  );
}
