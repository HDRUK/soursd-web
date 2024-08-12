"use client";

import { ActionList, ActionListItem } from "@/components/ActionList";
import { Permission } from "@/services/permissions/types";
import { FormMutateState } from "@/types/form";
import { getCheckboxFormValuesFromIntersection } from "@/utils/form";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { Alert, Switch } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { Message } from "../Message";

export type AssignOptionsFormValues = Record<string, boolean>;

export interface AssignOptionsProps {
  mutateState: FormMutateState;
  parentData: Permission[];
  subsetData: Permission[];
  onSubmit(values: AssignOptionsFormValues): void;
}

export default function PermissionsSection({
  mutateState,
  parentData,
  subsetData,
  onSubmit,
}: AssignOptionsProps) {
  const checkboxData = parentData.map(({ name: label, id }) => ({
    label,
    id: id.toString(),
  }));

  const methods = useForm<AssignOptionsFormValues>({
    defaultValues: getCheckboxFormValuesFromIntersection(
      checkboxData,
      subsetData
    ),
  });

  const { register, handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {mutateState.isError && (
          <Message severity="error" sx={{ mb: 3 }}>
            {`${mutateState.error}`}
          </Message>
        )}
        <ActionList sx={{ listStyleType: "none", p: 0, m: 0, mb: 2 }}>
          {checkboxData.map(({ label, id }) => (
            <ActionListItem
              key={id}
              primaryText={label}
              primaryAction={
                <Switch
                  {...register(id)}
                  checked={methods.watch(id)}
                  color="success"
                  inputProps={{
                    "aria-label": label,
                  }}
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

// List striped story
// Tests for permissions sections checkboxes
// Util tests
