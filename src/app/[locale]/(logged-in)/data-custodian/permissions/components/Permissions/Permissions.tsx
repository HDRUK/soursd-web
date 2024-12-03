"use client";

import AssignOptions, {
  AssignOptionsFormValues,
} from "@/components/AssignOptions";
import { Permission } from "@/services/permissions";
import { EntityType } from "@/types/api";
import { convertStringsToNumbers } from "@/utils/array";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useMutatePermissions } from "../../hooks";

const NAMESPACE_TRANSLATIONS_PERMISSIONS = "Permissions";

export interface PermissionsProps {
  userId: number;
  type: EntityType;
  issuerId: number;
  permissions: Permission[];
  userPermissions: Permission[];
}

export default function Permissions({
  userId,
  issuerId,
  permissions,
  userPermissions,
  type,
}: PermissionsProps) {
  const tPermissions = useTranslations(NAMESPACE_TRANSLATIONS_PERMISSIONS);

  const {
    isError: isUpdateError,
    isLoading: isUpdateLoading,
    error: updateError,
    sendRequest,
  } = useMutatePermissions(type, userId);

  const handleSubmit = useCallback((values: AssignOptionsFormValues) => {
    sendRequest({
      issuer_id: issuerId,
      permissions: convertStringsToNumbers(
        Object.keys(values).filter((key: string) => values[key])
      ),
    });
  }, []);

  return (
    <AssignOptions
      loadingState={{
        isLoading: isUpdateLoading,
        isError: isUpdateError,
        error: updateError && tPermissions(updateError),
      }}
      onSubmit={handleSubmit}
      parentData={permissions}
      subsetData={userPermissions}
    />
  );
}
