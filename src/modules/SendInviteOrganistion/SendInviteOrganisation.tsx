import ContactLink from "@/components/ContactLink";
import InviteOrganisation from "@/modules/InviteOrganisation";
import useOrganisationInvite from "@/queries/useOrganisationInvite";
import { showAlert } from "@/utils/showAlert";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_ORGANISATION = "Organisation";

export default function SendInviteOrganisation() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ORGANISATION);

  const handleErrorAlert = () => {
    showAlert("error", {
      text: t.rich("inviteOrganisationError", {
        contactLink: ContactLink,
      }),
      confirmButtonText: t("inviteOrganisationErrorButton"),
    });
  };

  const handleSuccessAlert = () => {
    showAlert("success", {
      text: t("inviteOrganisationSuccess"),
      confirmButtonText: t("inviteOrganisationSuccessButton"),
    });
  };

  const { queryState, handleSubmit } = useOrganisationInvite({
    onError: handleErrorAlert,
    onSuccess: handleSuccessAlert,
  });

  return <InviteOrganisation onSubmit={handleSubmit} queryState={queryState} />;
}
