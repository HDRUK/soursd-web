"use client";

import FormActions from "@/components/FormActions";
import FormControl from "@/components/FormControl";
import FormSection from "@/components/FormSection";
import yup from "@/config/yup";
import { useStore } from "@/data/store";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { showAlert } from "@/utils/showAlert";
import { LoadingButton } from "@mui/lab";
import { Grid, MenuItem, Select, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import Markdown from "@/components/Markdown";
import Form from "@/components/Form";
import {
  PostOrganisationInviteUserPayload,
  postOrganisationInviteUser,
} from "@/services/organisations";

import { patchUserQuery } from "@/services/users";

import { User } from "@/types/application";

export interface DelegatesFormValues {
  first_name: string;
  last_name: string;
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
  const departments = organisation?.departments || [];

  const filteredDepartments = departments.map(department => ({
    label: department.name,
    value: department.id,
  }));

  console.log(delegate);
  const { mutateAsync, isPending } = useMutation(
    patchUserQuery(delegate?.id as number)
  );

  const handleSubmit = useCallback(
    async (
      fields: DelegatesFormValues,
      event: React.FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();
      event.stopPropagation();
      //
      onSuccess();
    },
    [mutateAsync, onSuccess, t]
  );
  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string().required(),
        last_name: yup.string().required(t("delegateFullNameRequiredInvalid")),
      }),
    [t]
  );

  const formOptions = {
    defaultValues: {
      first_name: delegate.first_name,
      last_name: delegate.last_name,
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
          <Markdown>{t("delegateFormDescription")}</Markdown>
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
          </Grid>
        </FormSection>
        <FormActions>
          <LoadingButton
            loading={isPending}
            type="submit"
            endIcon={<AddCircleOutlineIcon />}
            sx={{ marginBottom: "20px" }}>
            {t("saveButton")}
          </LoadingButton>
        </FormActions>
      </>
    </Form>
  );
}
