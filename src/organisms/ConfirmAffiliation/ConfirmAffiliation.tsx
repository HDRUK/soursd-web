import { useStore } from "@/data/store";
import { mockedPendingAffiliations } from "@/mocks/data/cms";
import { Box, Button } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import ActionsPanel from "../../components/ActionsPanel";
import { RejectIcon, VerifyIcon } from "../../consts/icons";
import useQueryAlerts from "../../hooks/useQueryAlerts";
import {
  getAffiliationsQuery,
  putRegistryHasAffiliationQuery,
} from "../../services/affiliations";
import { AffiliationStatus } from "../../services/affiliations/types";

const NAMESPACE_TRANSLATION = "ConfirmAffiliation";

export default function ConfirmAffiliation() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const { currentUser, organisation } = useStore(state => ({
    currentUser: state.getCurrentUser(),
    organisation: state.getOrganisation(),
  }));

  const {
    data: affiliationsData,
    refetch,
    ...queryState
  } = useQuery(getAffiliationsQuery(currentUser?.registry_id as number));

  const currentPendingAffiliation = useMemo(
    () =>
      affiliationsData?.data.data.find(
        affiliation =>
          affiliation.organisation_id === organisation?.id &&
          affiliation.registryAffiliationState === "affiliation_pending"
      ),
    [affiliationsData, organisation]
  );
  const { mutateAsync: updateAffiliationStatus, ...mutateState } = useMutation(
    putRegistryHasAffiliationQuery()
  );

  useQueryAlerts(mutateState);

  const handleClick = async (status: AffiliationStatus) => {
    await updateAffiliationStatus({
      registryId: currentUser.registry_id,
      affiliationId: currentPendingAffiliation?.id as number,
      status,
    });
    refetch();
  };

  return (
    currentPendingAffiliation && (
      <ActionsPanel heading={t("heading")}>
        {mockedPendingAffiliations}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            disabled={mutateState.isPending || queryState.isLoading}
            onClick={() => handleClick(AffiliationStatus.Approved)}
            startIcon={<VerifyIcon sx={{ color: "#fff" }} />}>
            {t("confirmAffiliationButton")}
          </Button>
          <Button
            disabled={mutateState.isPending || queryState.isLoading}
            onClick={() => handleClick(AffiliationStatus.Rejected)}
            startIcon={<RejectIcon />}
            variant="outlined"
            sx={{ background: "#fff" }}>
            {t("declineAffiliationButton")}
          </Button>
        </Box>
      </ActionsPanel>
    )
  );
}
