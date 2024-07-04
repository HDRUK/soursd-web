"use client";

import { ActionList, ActionListItem } from "@/components/ActionList";
import { Permission } from "@/services/permissions/types";
import { FormMutateState } from "@/types/form";
import { getCheckboxFormValuesFromIntersection } from "@/utils/form";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Switch } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

export type PermissionsFormValues = Record<string, boolean>;

interface PermissionsSectionProps {
  mutateState: FormMutateState;
  organisationPermissions: Permission[];
  researcherPermissions: Permission[];
  onSubmit(values: PermissionsFormValues): void;
}

export default function PermissionsSection({
  mutateState,
  organisationPermissions,
  researcherPermissions,
  onSubmit,
}: PermissionsSectionProps) {
  const checkboxData = organisationPermissions.map(({ name: label, id }) => ({
    label,
    id: id.toString(),
  }));

  const methods = useForm<PermissionsFormValues>({
    defaultValues: getCheckboxFormValuesFromIntersection(
      checkboxData,
      researcherPermissions
    ),
  });

  const { register, handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ActionList sx={{ listStyleType: "none", p: 0, m: 0, mb: 2 }}>
          {checkboxData.map(({ label, id }) => (
            <ActionListItem
              primaryText={label}
              primaryAction={
                <Switch
                  {...register(id)}
                  checked={methods.watch(id)}
                  color="success"
                />
              }
            />
          ))}
        </ActionList>
        <LoadingButton
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<SaveIcon />}
          loading={mutateState.isLoading}>
          Save
        </LoadingButton>
      </form>
    </FormProvider>
  );
}

//
