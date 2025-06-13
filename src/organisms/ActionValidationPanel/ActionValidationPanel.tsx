import { useStore } from "@/data/store";
import { useTranslations } from "next-intl";
import ActionsPanel from "../../components/ActionsPanel";
import LoadingWrapper from "../../components/LoadingWrapper";
import { Message } from "../../components/Message";
import useOrganisationCustodianApproval from "../../hooks/useOrganisationCustodianApproval";
import useProjectUserCustodianApproval from "../../hooks/useProjectUserCustodianApproval";
import ActionValidationStatus from "../../modules/ActionValidationStatus";
import { QueryState } from "../../types/form";
import { ValidationLog } from "../../types/logs";
import ActionsPanelValidationCheck from "../ActionsPanelValidationCheck";

const NAMESPACE_TRANSLATION_ACTION_VALIDATION = "ActionValidationPanel";

export const ActionValidationVariants = {
  ProjectUser: "ProjectUser",
  Organisation: "Organisation",
} as const;

interface ActionValidationPanelProps {
  variant: keyof typeof ActionValidationVariants;
  logs: ValidationLog[];
  queryState: QueryState;
}

interface CustodianParams {
  custodianId: number;
  projectUserId: number;
}

interface OrganisationParams {
  custodianId: number;
  organisationId: number;
}

function ActionValidationPanel({
  variant,
  logs,
  queryState = { isLoading: false, isError: false },
}: ActionValidationPanelProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_ACTION_VALIDATION);

  const { custodianId, projectUserId, organisationId } = useStore(store => ({
    custodianId: store.getCustodian()?.id as number,
    organisationId: store.getCurrentOrganisation()?.id as number,
    projectUserId: store.getCurrentProjectUser()?.id as number,
  }));

  let actionValidationStatus;
  switch (variant) {
    case ActionValidationVariants.ProjectUser: {
      actionValidationStatus = (
        <ActionValidationStatus<CustodianParams>
          useApprovalHook={useProjectUserCustodianApproval}
          hookParams={{ custodianId, projectUserId }}
        />
      );
      break;
    }
    case ActionValidationVariants.Organisation: {
      // need to reimplement this in another ticket
      /*actionValidationStatus = (
        <ActionValidationStatus<OrganisationParams>
          useApprovalHook={useOrganisationCustodianApproval}
          hookParams={{ custodianId, organisationId }}
        />
      );*/
      break;
    }
    default:
      break;
  }

  return (
    <LoadingWrapper variant="basic" loading={queryState?.isLoading || false}>
      <ActionsPanel heading={t("title")}>
        {logs
          .filter(log => log.validation_check.enabled) // move to BE?
          .map(log => (
            <ActionsPanelValidationCheck key={log.id} log={log} />
          ))}
        {actionValidationStatus}
      </ActionsPanel>
      {queryState.isError && (
        <Message severity="error" sx={{ mb: 3 }}>
          {t(queryState.error)}
        </Message>
      )}
    </LoadingWrapper>
  );
}

export default ActionValidationPanel;
