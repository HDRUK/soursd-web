"use client";
import { useStore } from "@/data/store";
import { useQuery } from "@tanstack/react-query";
import { getCustodianProjectUserValidationLogsQuery } from "@/services/validation_logs";
import { getUserQuery } from "@/services/users";
import ActionsPanel from "@/components/ActionsPanel";
import ActionsPanelValidationChecks from "@/components/ActionsPanelValidationChecks";

interface CustodianProjectUserProps {
  projectId: number;
  userId: number;
}

function CustodianProjectUser({
  projectId,
  userId,
}: CustodianProjectUserProps) {
  const custodian = useStore(state => state.getCustodian());

  const { data: userData } = useQuery(getUserQuery(userId));

  const { registry_id: registryId } = userData?.data || {};

  const { data: validationLogs, isLoading } = useQuery({
    ...getCustodianProjectUserValidationLogsQuery(
      custodian?.id as number,
      projectId,
      registryId as number
    ),
    enabled: !!registryId,
  });

  if (isLoading) return null;

  return (
    <ActionsPanel heading="Validation Checks">
      {validationLogs?.data.map(log => (
        <ActionsPanelValidationChecks key={log.id} log={log} />
      ))}
    </ActionsPanel>
  );
}

export default CustodianProjectUser;
