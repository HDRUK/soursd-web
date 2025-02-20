"use client";

import FormActions from "@/components/FormActions";
import FormControl from "@/components/FormControlWrapper";
import FormSection from "@/components/FormSection";
import yup from "@/config/yup";
import { useStore } from "@/data/store";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { LoadingButton } from "@mui/lab";
import { Grid, MenuItem, Select, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import SelectDepartments from "@/components/SelectDepartments";
import Form from "@/components/Form";
import { patchUserQuery } from "@/services/users";
import { User } from "@/types/application";

export interface DelegatesFormValues {
  first_name: string;
  last_name: string;
  department: number;
}

export interface EditDelegateFormProps {
  delegate: User;
  onSuccess: () => void;
}

const NAMESPACE_TRANSLATION_DELEGATES = "Form";
export default function EditDelegateForm({
  delegate,
  onSuccess,
}: EditDelegateFormProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_DELEGATES);
  const organisation = useStore(state => state.config.organisation);

  const { mutateAsync, isPending } = useMutation(
    patchUserQuery(delegate?.id as number)
  );

  const handleSubmit = useCallback(
    async (fields: DelegatesFormValues) => {
      // this is coming in another task
      onSuccess();
    },
    [mutateAsync, onSuccess, t]
  );
  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup
          .string()
          .required(t("delegateFirstNameRequiredInvalid")),
        last_name: yup.string().required(t("delegateLastNameRequiredInvalid")),
        department: yup.number().required(t("departmentRequiredInvalid")),
      }),
    [t]
  );

  const formOptions = {
    defaultValues: {
      first_name: delegate?.first_name,
      last_name: delegate?.last_name,
      department: delegate?.departments?.[0]?.id,
    },
  };

  return (
    <Form
      sx={{ mt: 1 }}
      schema={schema}
      onSubmit={handleSubmit}
      {...formOptions}>
      <>
        <FormSection>
          <Grid
            container
            rowSpacing={3}
            sx={{ width: "70%", justifyContent: "flex-start" }}>
            <Grid item xs={12}>
              <FormControl
                name="first_name"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl
                name="last_name"
                renderField={fieldProps => <TextField {...fieldProps} />}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl
                name="department"
                renderField={fieldProps => (
                  <SelectDepartments
                    organisation={organisation}
                    {...fieldProps}
                    inputProps={{
                      "aria-label": t("departmentNameAriaLabel"),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </FormSection>
        <FormActions>
          <LoadingButton
            loading={isPending}
            type="submit"
            endIcon={<AddCircleOutlineIcon />}
            sx={{ marginBottom: "20px" }}>
            {t("save")}
          </LoadingButton>
        </FormActions>
      </>
    </Form>
  );
}
