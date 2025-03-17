import DateInput from "@/components/DateInput";
import Form from "@/components/Form";
import FormActions from "@/components/FormActions";
import FormControlCheckbox from "@/components/FormControlCheckbox";
import FormControlWrapper from "@/components/FormControlWrapper";
import SelectInput from "@/components/SelectInput";
import yup from "@/config/yup";
import { AffiliationRelationship } from "@/consts/user";
import useOrganisationsQuery from "@/services/organisations/useOrganisationsQuery";
import { useQuery } from "@tanstack/react-query";
import { getOrganisationQuery } from "@/services/organisations";
import { ResearcherAffiliation } from "@/types/application";
import { MutationState } from "@/types/form";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Link, MenuItem, Select, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import AskOrganisationModal from "../AskOrganisation";
import SelectDepartments from "@/components/SelectDepartments";

export interface AffiliationsFormProps {
  onSubmit: (affiliation: ResearcherAffiliation) => void;
  onClose: () => void;
  queryState: MutationState;
}

const NAMESPACE_TRANSLATION_PROFILE = "Profile";
const NAMESPACE_TRANSLATION_FORM = "Form";
const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function AffiliationsForm({
  onSubmit,
  onClose,
  queryState,
}: AffiliationsFormProps) {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const tApplication = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [selectedOrganisationId, setSelectedOrganisationId] = useState<
    number | null
  >();

  const { data: organisationsData } = useOrganisationsQuery();

  // keeping in some department code..
  // - this is not used, but incase we want to turn it on..
  const useDepartment = false;
  const { data: selectedOrganisation } = useQuery({
    ...getOrganisationQuery(selectedOrganisationId || 1),
    enabled: useDepartment && !!selectedOrganisationId,
  });

  const schema = useMemo(
    () =>
      yup.object().shape({
        current_employer: yup.boolean(),
        member_id: yup.string().required(tForm("memberIdRequiredInvalid")),
        from: yup.date().required(tForm("fromRequiredInvalid")),
        to: yup.date().when("current_employer", {
          is: (value: boolean) => !!value,
          otherwise: schema => schema.required(tForm("toRequiredInvalid")),
          then: schema => schema.notRequired(),
        }),
        organisation_id: yup
          .string()
          .required(tForm("organisationRequiredInvalid")),
        relationship: yup
          .string()
          .required(tForm("relationshipRequiredInvalid")),
        role: yup.string().required(tForm("positionRequiredInvalid")),
        email: yup.string().email(tForm("professionalEmailFormatInvalid")),
      }),
    [tForm]
  );

  const formOptions = {
    defaultValues: {
      member_id: "",
      organisation_id: "",
      current_employer: false,
      relationship: "",
      from: null,
      to: null,
      role: "",
      email: "",
      ror: "", // keeping this blank for now
      department: "", // keeping this blank for now
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
      <Form onSubmit={onSubmit} schema={schema} {...formOptions} sx={{ mb: 3 }}>
        {({ watch }) => {
          const isCurrent = watch("current_employer");
          const organisation_id = watch("organisation_id");
          setSelectedOrganisationId(organisation_id);

          return (
            <>
              <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                  <FormControlWrapper
                    name="organisation_id"
                    renderField={fieldProps => (
                      <Select {...fieldProps}>
                        {(organisationsData ?? []).map(
                          (org: { organisation_name: string; id: string }) => (
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
                    description={
                      <>
                        {tProfile("organisationNotListed")}{" "}
                        <Link
                          component="button"
                          onClick={() => {
                            setInviteOpen(true);
                          }}>
                          {tProfile("organisationRegister")}
                        </Link>
                      </>
                    }
                  />
                </Grid>
                {useDepartment && (
                  <Grid item xs={12}>
                    <FormControlWrapper
                      name="department"
                      renderField={fieldProps => (
                        <SelectDepartments
                          organisation={selectedOrganisation?.data || []}
                          {...fieldProps}
                        />
                      )}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Grid container columnSpacing={3}>
                    <Grid item xs={6}>
                      <FormControlWrapper
                        name="from"
                        renderField={fieldProps => (
                          <DateInput {...fieldProps} />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlWrapper
                        name="to"
                        disabled={isCurrent}
                        renderField={fieldProps => (
                          <DateInput {...fieldProps} disabled={isCurrent} />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormControlCheckbox
                    name="current_employer"
                    label={tForm("currentEmployer")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlWrapper
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
                  <FormControlWrapper
                    name="role"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlWrapper
                    description={tProfile("memberIdDescription")}
                    name="member_id"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlWrapper
                    name="email"
                    renderField={fieldProps => <TextField {...fieldProps} />}
                  />
                </Grid>
              </Grid>
              <FormActions>
                <Button variant="outlined" onClick={onClose}>
                  {tApplication("cancel")}
                </Button>
                <LoadingButton loading={queryState.isPending} type="submit">
                  {tProfile("addAffiliation")}
                </LoadingButton>
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
