import ContactLink from "@/components/ContactLink";
import InviteOrganisation from "@/modules/InviteOrganisation";
import useOrganisationInvite from "@/queries/useOrganisationInvite";
import { showAlert } from "@/utils/showAlert";
import { useTranslations } from "next-intl";
import ReactDOMServer from "react-dom/server";

const NAMESPACE_TRANSLATIONS_ORGANISATION = "Organisation";

interface SendInviteOrganisationProps {
  onClose?: () => void;
}

export default function SendInviteOrganisation({
  onClose,
}: SendInviteOrganisationProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ORGANISATION);

  const handleErrorAlert = () => {
    onClose?.();
    showAlert("error", {
      text: ReactDOMServer.renderToString(
        t.rich("inviteOrganisationError", {
          contactLink: ContactLink,
        })
      ),
      confirmButtonText: t("inviteOrganisationErrorButton"),
    });
  };

  const handleSuccessAlert = () => {
    onClose?.();
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
