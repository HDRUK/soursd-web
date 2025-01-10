"use client";

import ApplicationLink from "@/components/ApplicationLink";
import OverlayCenter from "@/components/OverlayCenter";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import { getCustodianByUniqueIdentifier } from "@/services/custodians";
import { handleRegister } from "@/utils/keycloak";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";

interface InviteProps {
  uniqueId: string;
}

const NAMESPACE_TRANSLATIONS_PROFILE = "Register";

export default function Invite({ uniqueId }: InviteProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  const {
    data: custodianData,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ["getCustodianByUniqueIdentifier", uniqueId],
    queryFn: ({ queryKey }) => {
      return getCustodianByUniqueIdentifier(queryKey[1], {
        error: {
          message: "getCustodianByUniqueIdentifierError",
        },
      });
    },
  });

  if (isFetched) {
    if (isError) {
      notFound();
    } else if (custodianData?.data.invite_accepted_at) {
      return (
        <OverlayCenterAlert>
          {t.rich("inviteAccepted", {
            applicationLink: ApplicationLink,
          })}
        </OverlayCenterAlert>
      );
    }

    handleRegister();
  }

  return (
    <OverlayCenter variant="contained">
      <CircularProgress aria-label={t("loadingAriaLabel")} />
    </OverlayCenter>
  );
}
