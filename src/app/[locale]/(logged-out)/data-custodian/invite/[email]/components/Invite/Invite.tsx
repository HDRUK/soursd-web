"use client";

import ContactLink from "@/components/ContactLink";
import OverlayCenter from "@/components/OverlayCenter";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import useInviteCustodian from "@/hooks/useInviteCustodian";
import { handleRegister } from "@/utils/keycloak";
import { CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";

interface InviteProps {
  email: string;
  isUser?: boolean;
}

const NAMESPACE_TRANSLATIONS_PROFILE = "Register";

export default function Invite({ email, isUser }: InviteProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  const {
    data: custodianData,
    isFetched,
    isError,
  } = useInviteCustodian({
    email: atob(decodeURIComponent(email)),
    isUser,
  });

  if (isFetched) {
    if (isError) {
      notFound();
    } else if (custodianData?.data.invite_accepted_at) {
      return (
        <OverlayCenterAlert>
          {t.rich("inviteAccepted", {
            contactLink: ContactLink,
          })}
        </OverlayCenterAlert>
      );
    }

    handleRegister();
  }

  return (
    <OverlayCenter variant="contained">
      <CircularProgress aria-label={t("registeringCustodianAriaLabel")} />
    </OverlayCenter>
  );
}
