import ContactLink from "@/components/ContactLink";
import InviteCustodian from "@/modules/InviteCustodian";
import InviteOrganisation from "@/modules/InviteOrganisation";
import useCustodianInvite from "@/queries/useCustodianInvite";
import { showAlert } from "@/utils/showAlert";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_ORGANISATION = "Custodian";

export default function SendInviteOrganisation() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ORGANISATION);

  const handleErrorAlert = () => {
    showAlert("error", {
      text: t.rich("inviteCustodianError", {
        contactLink: ContactLink,
      }),
      confirmButtonText: t("inviteCustodianErrorButton"),
    });
  };

  const handleSuccessAlert = () => {
    showAlert("success", {
      text: t("inviteCustodianSuccess"),
      confirmButtonText: t("inviteCustodianSuccessButton"),
    });
  };

  const { queryState, handleSubmit } = useCustodianInvite({
    onError: handleErrorAlert,
    onSuccess: handleSuccessAlert,
  });

  return <InviteCustodian onSubmit={handleSubmit} queryState={queryState} />;
}
