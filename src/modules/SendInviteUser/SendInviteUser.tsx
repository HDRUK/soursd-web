import { useTranslations } from "next-intl";
import ErrorMessage from "@/components/ErrorMessage";
import InviteUser from "../InviteUser";
import useUserInvite from "../../queries/useUserInvite";
import { showAlert } from "../../utils/showAlert";
import { useState } from "react";

const NAMESPACE_TRANSLATIONS_ORGANISATION = "User";

interface SendInviteUserProps {
  forceSelectOrganisation?: boolean;
  organisationId?: number;
  onSuccess?: () => void;
  onError?: () => void;
}

export default function SendInviteUser({
  forceSelectOrganisation = false,
  organisationId,
  onSuccess,
  onError,
}: SendInviteUserProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ORGANISATION);

  return <InviteUser onSuccess={onSuccess} />;
}
