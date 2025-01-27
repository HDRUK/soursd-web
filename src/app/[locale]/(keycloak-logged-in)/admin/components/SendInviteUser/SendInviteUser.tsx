import ContactLink from "@/components/ContactLink";
import InviteUser from "@/modules/InviteUser";
import useUserInvite from "@/queries/useUserInvite";
import { showAlert } from "@/utils/showAlert";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_ORGANISATION = "User";

export default function SendInviteOrganisation() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ORGANISATION);

  const handleErrorAlert = () => {
    showAlert("error", {
      text: t.rich("inviteUserError", {
        contactLink: ContactLink,
      }),
      confirmButtonText: t("inviteUserErrorButton"),
    });
  };

  const handleSuccessAlert = () => {
    showAlert("success", {
      text: t("inviteUserSuccess"),
      confirmButtonText: t("inviteUserSuccessButton"),
    });
  };

  const { queryState, handleSubmit } = useUserInvite({
    onError: handleErrorAlert,
    onSuccess: handleSuccessAlert,
  });

  return <InviteUser onSubmit={handleSubmit} queryState={queryState} />;
}
